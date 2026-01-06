import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CreditCardChargeType,
  CreditCardInvoiceStatus,
  CreditCardStatus,
  TransactionKind,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { InvoiceParserService } from "./invoice-parser.service";

@Injectable()
export class CreditCardsService {
  constructor(
    private prisma: PrismaService,
    private invoiceParser: InvoiceParserService,
  ) {}

  // ==================== CREDIT CARDS ====================

  async createCard(workspaceId: string, data: any) {
    // Validate workspace exists
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace ${workspaceId} not found`);
    }

    return this.prisma.creditCard.create({
      data: {
        workspaceId,
        name: data.name,
        brand: data.brand,
        last4: data.last4,
        currency: data.currency || "BRL",
        creditLimit: data.creditLimit,
        closingDay: data.closingDay,
        dueDay: data.dueDay,
        paymentAccountId: data.paymentAccountId,
        status: data.status || CreditCardStatus.ACTIVE,
      },
      include: {
        paymentAccount: true,
      },
    });
  }

  async findAllCards(workspaceId: string) {
    return this.prisma.creditCard.findMany({
      where: { workspaceId },
      include: {
        paymentAccount: true,
        _count: {
          select: {
            invoices: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findCardById(workspaceId: string, cardId: string) {
    const card = await this.prisma.creditCard.findFirst({
      where: { id: cardId, workspaceId },
      include: {
        paymentAccount: true,
        invoices: {
          orderBy: { month: "desc" },
          take: 6,
        },
      },
    });

    if (!card) {
      throw new NotFoundException("Cartão não encontrado");
    }

    return card;
  }

  async updateCard(workspaceId: string, cardId: string, data: any) {
    const card = await this.findCardById(workspaceId, cardId);

    return this.prisma.creditCard.update({
      where: { id: card.id },
      data: {
        name: data.name,
        brand: data.brand,
        last4: data.last4,
        creditLimit: data.creditLimit,
        closingDay: data.closingDay,
        dueDay: data.dueDay,
        paymentAccountId: data.paymentAccountId,
        status: data.status,
      },
      include: {
        paymentAccount: true,
      },
    });
  }

  async deleteCard(workspaceId: string, cardId: string) {
    const card = await this.findCardById(workspaceId, cardId);

    // Soft delete: just set to INACTIVE
    return this.prisma.creditCard.update({
      where: { id: card.id },
      data: { status: CreditCardStatus.INACTIVE },
    });
  }

  // ==================== INVOICES ====================

  async ensureInvoice(
    workspaceId: string,
    creditCardId: string,
    month: string
  ) {
    // Validate card exists
    const card = await this.findCardById(workspaceId, creditCardId);

    // Check if invoice already exists
    let invoice = await this.prisma.creditCardInvoice.findFirst({
      where: {
        workspaceId,
        creditCardId,
        month,
      },
    });

    if (!invoice) {
      // Calculate due date based on card's dueDay
      const dueDate = this.calculateDueDate(month, card.dueDay);

      invoice = await this.prisma.creditCardInvoice.create({
        data: {
          workspaceId,
          creditCardId,
          month,
          status: CreditCardInvoiceStatus.OPEN,
          dueDate,
          totalAmount: 0,
        },
      });
    }

    return invoice;
  }

  async uploadInvoice(
    workspaceId: string,
    cardId: string,
    month: string,
    file: Express.Multer.File
  ) {
    // Verify card exists and belongs to workspace
    const card = await this.findCardById(workspaceId, cardId);

    if (!card) {
      throw new NotFoundException("Cartão não encontrado");
    }

    // Check file type - only accept XLSX files for import
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    const isExcelFile = fileExtension === 'xlsx' || fileExtension === 'xls';

    if (!isExcelFile) {
      throw new BadRequestException(
        'Formato de arquivo inválido. Por favor, envie um arquivo Excel (.xlsx ou .xls)'
      );
    }

    // Parse the Excel file to extract charges
    const parsedData = this.invoiceParser.parseInvoiceFile(file.buffer);

    // Validate that the card last4 matches
    if (card.last4 && card.last4 !== parsedData.cardLast4) {
      throw new BadRequestException(
        `O arquivo parece ser de outro cartão (final ${parsedData.cardLast4}). Este cartão termina em ${card.last4}.`
      );
    }

    // Ensure invoice exists
    const invoice = await this.ensureInvoice(workspaceId, cardId, month);

    // Create charges from parsed data
    const chargesCreated = await Promise.all(
      parsedData.charges.map(charge =>
        this.createCharge(workspaceId, invoice.id, {
          date: charge.date,
          description: charge.description,
          amount: charge.amountBRL,
          type: charge.amountBRL > 0 ? CreditCardChargeType.PURCHASE : CreditCardChargeType.REFUND,
        })
      )
    );

    // Update invoice to mark as closed
    const updatedInvoice = await this.prisma.creditCardInvoice.update({
      where: { id: invoice.id },
      data: {
        closedAt: new Date(),
        status: CreditCardInvoiceStatus.CLOSED,
      },
      include: {
        creditCard: true,
        payment: true,
        charges: {
          include: {
            category: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return {
      ...updatedInvoice,
      importSummary: {
        totalCharges: chargesCreated.length,
        totalAmount: parsedData.totalAmount,
        holderName: parsedData.holderName,
      },
    };
  }

  async findInvoices(
    workspaceId: string,
    creditCardId: string,
    from?: string,
    to?: string
  ) {
    const where: any = {
      workspaceId,
      creditCardId,
    };

    if (from || to) {
      where.month = {};
      if (from) where.month.gte = from;
      if (to) where.month.lte = to;
    }

    return this.prisma.creditCardInvoice.findMany({
      where,
      include: {
        creditCard: true,
        payment: true,
        _count: {
          select: {
            charges: true,
          },
        },
      },
      orderBy: { month: "desc" },
    });
  }

  async findInvoiceById(workspaceId: string, invoiceId: string) {
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: { id: invoiceId, workspaceId },
      include: {
        creditCard: true,
        charges: {
          include: {
            category: true,
            person: true,
          },
          orderBy: { purchaseDate: "desc" },
        },
        payment: {
          include: {
            transaction: true,
          },
        },
      },
    });

    if (!invoice) {
      throw new NotFoundException("Fatura não encontrada");
    }

    // Calculate totals by category
    const totalsByCategory = await this.computeTotalsByCategory(invoiceId);

    return {
      ...invoice,
      totalsByCategory,
    };
  }

  async closeInvoice(workspaceId: string, invoiceId: string) {
    const invoice = await this.findInvoiceById(workspaceId, invoiceId);

    if (invoice.status !== CreditCardInvoiceStatus.OPEN) {
      throw new BadRequestException("Fatura já está fechada ou paga");
    }

    // Recalculate total
    const totalAmount = await this.computeInvoiceTotal(invoiceId);

    return this.prisma.creditCardInvoice.update({
      where: { id: invoiceId },
      data: {
        status: CreditCardInvoiceStatus.CLOSED,
        closedAt: new Date(),
        totalAmount,
      },
    });
  }

  // ==================== CHARGES ====================

  async createCharge(workspaceId: string, invoiceId: string, data: any) {
    const invoice = await this.findInvoiceById(workspaceId, invoiceId);

    if (invoice.status === CreditCardInvoiceStatus.PAID) {
      throw new BadRequestException(
        "Não é possível adicionar lançamentos a uma fatura paga"
      );
    }

    const charge = await this.prisma.creditCardCharge.create({
      data: {
        workspaceId,
        creditCardId: invoice.creditCardId,
        invoiceId,
        type: data.type || CreditCardChargeType.PURCHASE,
        description: data.description,
        purchaseDate: new Date(data.purchaseDate),
        postedAt: data.postedAt ? new Date(data.postedAt) : null,
        amount: data.amount,
        categoryId: data.categoryId,
        personId: data.personId,
        externalId: data.externalId,
      },
      include: {
        category: true,
        person: true,
      },
    });

    // Update invoice total
    await this.updateInvoiceTotal(invoiceId);

    return charge;
  }

  async findCharges(
    workspaceId: string,
    invoiceId: string,
    categoryId?: string,
    q?: string
  ) {
    const where: any = {
      workspaceId,
      invoiceId,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (q) {
      where.description = {
        contains: q,
        mode: "insensitive",
      };
    }

    return this.prisma.creditCardCharge.findMany({
      where,
      include: {
        category: true,
        person: true,
      },
      orderBy: { purchaseDate: "desc" },
    });
  }

  async updateCharge(workspaceId: string, chargeId: string, data: any) {
    const charge = await this.prisma.creditCardCharge.findFirst({
      where: { id: chargeId, workspaceId },
    });

    if (!charge) {
      throw new NotFoundException("Lançamento não encontrado");
    }

    const updated = await this.prisma.creditCardCharge.update({
      where: { id: chargeId },
      data: {
        description: data.description,
        type: data.type,
        categoryId: data.categoryId,
        personId: data.personId,
        amount: data.amount,
      },
      include: {
        category: true,
        person: true,
      },
    });

    // Update invoice total
    await this.updateInvoiceTotal(charge.invoiceId);

    return updated;
  }

  async deleteCharge(workspaceId: string, chargeId: string) {
    const charge = await this.prisma.creditCardCharge.findFirst({
      where: { id: chargeId, workspaceId },
    });

    if (!charge) {
      throw new NotFoundException("Lançamento não encontrado");
    }

    await this.prisma.creditCardCharge.delete({
      where: { id: chargeId },
    });

    // Update invoice total
    await this.updateInvoiceTotal(charge.invoiceId);

    return { success: true };
  }

  // ==================== PAYMENTS ====================

  async payInvoice(workspaceId: string, invoiceId: string, data: any) {
    const invoice = await this.findInvoiceById(workspaceId, invoiceId);

    if (invoice.status === CreditCardInvoiceStatus.PAID) {
      throw new BadRequestException("Fatura já está paga");
    }

    // Check if payment already exists
    if (invoice.payment) {
      throw new BadRequestException("Fatura já possui pagamento registrado");
    }

    // Use provided account or card's default payment account
    const accountId = data.accountId || invoice.creditCard.paymentAccountId;
    if (!accountId) {
      throw new BadRequestException("Conta de pagamento não especificada");
    }

    // Validate account exists and belongs to workspace
    const account = await this.prisma.account.findFirst({
      where: { id: accountId, workspaceId },
    });

    if (!account) {
      throw new NotFoundException("Conta não encontrada");
    }

    // Calculate amount (default to invoice total)
    const totalAmount = await this.computeInvoiceTotal(invoiceId);
    const amount = data.amount || totalAmount;
    const paidAt = data.paidAt ? new Date(data.paidAt) : new Date();

    // Create transaction for payment (marked as CREDIT_CARD_PAYMENT so it won't count in budget)
    // Get any category to satisfy the constraint (will be ignored in budget calculations)
    const anyCategory = await this.prisma.category.findFirst({
      where: { workspaceId },
    });

    if (!anyCategory) {
      throw new BadRequestException(
        "Nenhuma categoria disponível no workspace"
      );
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        workspaceId,
        date: paidAt,
        description: `Pagamento fatura cartão: ${invoice.creditCard.name} ${invoice.month}`,
        amount,
        type: "EXPENSE",
        kind: TransactionKind.CREDIT_CARD_PAYMENT,
        categoryId: anyCategory.id, // Required but will be ignored in budget
        accountId,
        competenceMonth: invoice.month,
      },
    });

    // Create payment record
    const payment = await this.prisma.creditCardInvoicePayment.create({
      data: {
        workspaceId,
        invoiceId,
        transactionId: transaction.id,
        accountId,
        paidAt,
        amount,
      },
      include: {
        transaction: true,
      },
    });

    // Update invoice status to PAID
    await this.prisma.creditCardInvoice.update({
      where: { id: invoiceId },
      data: {
        status: CreditCardInvoiceStatus.PAID,
        totalAmount,
      },
    });

    return payment;
  }

  async findPayment(workspaceId: string, invoiceId: string) {
    return this.prisma.creditCardInvoicePayment.findFirst({
      where: { invoiceId, workspaceId },
      include: {
        transaction: true,
      },
    });
  }

  // ==================== HELPERS ====================

  private async computeInvoiceTotal(invoiceId: string): Promise<number> {
    const result = await this.prisma.creditCardCharge.aggregate({
      where: { invoiceId },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount || 0;
  }

  private async updateInvoiceTotal(invoiceId: string) {
    const totalAmount = await this.computeInvoiceTotal(invoiceId);

    await this.prisma.creditCardInvoice.update({
      where: { id: invoiceId },
      data: { totalAmount },
    });
  }

  private async computeTotalsByCategory(invoiceId: string) {
    const charges = await this.prisma.creditCardCharge.findMany({
      where: { invoiceId },
      include: {
        category: true,
      },
    });

    const totals = new Map<string, any>();

    for (const charge of charges) {
      const key = charge.categoryId || "uncategorized";

      if (!totals.has(key)) {
        totals.set(key, {
          categoryId: charge.categoryId,
          categoryName: charge.category?.name || "Sem categoria",
          categoryIcon: charge.category?.icon,
          categoryColor: charge.category?.color,
          total: 0,
        });
      }

      const current = totals.get(key);
      current.total += charge.amount;
    }

    return Array.from(totals.values()).sort((a, b) => b.total - a.total);
  }

  private calculateDueDate(month: string, dueDay: number): Date {
    const [year, monthNum] = month.split("-").map(Number);

    // Due date is in the next month
    let dueYear = year;
    let dueMonth = monthNum + 1;

    if (dueMonth > 12) {
      dueMonth = 1;
      dueYear += 1;
    }

    // Adjust for invalid days (e.g., Feb 30)
    const dueDate = new Date(dueYear, dueMonth - 1, Math.min(dueDay, 28));

    return dueDate;
  }
}
