import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RecurringFrequency, TransactionStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RecurringTransactionsService {
  private readonly logger = new Logger(RecurringTransactionsService.name);

  constructor(private prisma: PrismaService) {}

  async create(workspaceId: string, data: any) {
    // Convert date strings to DateTime
    const createData: any = {
      ...data,
      workspaceId,
    };

    // Ensure startDate is a full DateTime
    if (createData.startDate && typeof createData.startDate === "string") {
      createData.startDate = new Date(createData.startDate + "T00:00:00.000Z");
    }

    // Ensure endDate is a full DateTime if provided
    if (createData.endDate && typeof createData.endDate === "string") {
      createData.endDate = new Date(createData.endDate + "T23:59:59.999Z");
    }

    return this.prisma.recurringTransaction.create({
      data: createData,
    });
  }

  async findAll(workspaceId: string) {
    return this.prisma.recurringTransaction.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(workspaceId: string, id: string) {
    const recurringTransaction =
      await this.prisma.recurringTransaction.findFirst({
        where: { id, workspaceId },
      });

    if (!recurringTransaction) {
      throw new NotFoundException("Recurring transaction not found");
    }

    return recurringTransaction;
  }

  async update(workspaceId: string, id: string, data: any) {
    await this.findOne(workspaceId, id); // Verifica se existe

    // Convert date strings to DateTime
    const updateData: any = { ...data };

    // Ensure startDate is a full DateTime
    if (updateData.startDate && typeof updateData.startDate === "string") {
      updateData.startDate = new Date(updateData.startDate + "T00:00:00.000Z");
    }

    // Ensure endDate is a full DateTime if provided
    if (updateData.endDate && typeof updateData.endDate === "string") {
      updateData.endDate = new Date(updateData.endDate + "T23:59:59.999Z");
    }

    return this.prisma.recurringTransaction.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(workspaceId: string, id: string) {
    await this.findOne(workspaceId, id); // Verifica se existe

    return this.prisma.recurringTransaction.delete({
      where: { id },
    });
  }

  // Cron job que roda a cada minuto para testar
  @Cron(CronExpression.EVERY_MINUTE)
  async generateRecurringTransactions() {
    this.logger.log("🔄 Checking for recurring transactions to generate...");

    const now = new Date();

    // Busca todas as transações recorrentes ativas
    const recurringTransactions =
      await this.prisma.recurringTransaction.findMany({
        where: {
          isActive: true,
          startDate: { lte: now },
          OR: [{ endDate: null }, { endDate: { gte: now } }],
        },
      });

    this.logger.log(
      `Found ${recurringTransactions.length} active recurring transactions`
    );

    for (const recurring of recurringTransactions) {
      try {
        const shouldGenerate = this.shouldGenerateTransaction(recurring, now);

        if (shouldGenerate) {
          await this.generateTransaction(recurring, now);
          this.logger.log(`✅ Generated transaction for: ${recurring.name}`);
        }
      } catch (error) {
        this.logger.error(
          `Failed to generate transaction for ${recurring.name}:`,
          error
        );
      }
    }
  }

  private shouldGenerateTransaction(recurring: any, now: Date): boolean {
    // Se nunca executou, deve gerar
    if (!recurring.lastRunAt) {
      return true;
    }

    const lastRun = new Date(recurring.lastRunAt);

    switch (recurring.frequency) {
      case RecurringFrequency.MINUTELY:
        // Gera a cada minuto
        const diffMinutes = (now.getTime() - lastRun.getTime()) / (1000 * 60);
        return diffMinutes >= 1;

      case RecurringFrequency.DAILY:
        // Gera se for um dia diferente
        return (
          now.getDate() !== lastRun.getDate() ||
          now.getMonth() !== lastRun.getMonth() ||
          now.getFullYear() !== lastRun.getFullYear()
        );

      case RecurringFrequency.WEEKLY:
        // Gera se passou uma semana e é o dia da semana correto
        const diffWeeks =
          (now.getTime() - lastRun.getTime()) / (1000 * 60 * 60 * 24 * 7);
        return diffWeeks >= 1 && now.getDay() === recurring.dayOfWeek;

      case RecurringFrequency.MONTHLY:
        // Gera se passou um mês e é o dia do mês correto
        const diffMonths =
          (now.getFullYear() - lastRun.getFullYear()) * 12 +
          (now.getMonth() - lastRun.getMonth());
        return diffMonths >= 1 && now.getDate() === recurring.dayOfMonth;

      case RecurringFrequency.YEARLY:
        // Gera se passou um ano e é o mesmo dia/mês
        return (
          now.getFullYear() > lastRun.getFullYear() &&
          now.getMonth() === lastRun.getMonth() &&
          now.getDate() === lastRun.getDate()
        );

      default:
        return false;
    }
  }

  private async generateTransaction(recurring: any, now: Date) {
    // Cria a transação baseada na recorrência
    await this.prisma.transaction.create({
      data: {
        workspaceId: recurring.workspaceId,
        date: now,
        description: recurring.description || recurring.name,
        amount: recurring.amount,
        type: recurring.type,
        status: TransactionStatus.PENDING,
        categoryId: recurring.categoryId,
        accountId: recurring.accountId,
        personId: recurring.personId,
        recurringTransactionId: recurring.id,
        competenceMonth: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
      },
    });

    // Atualiza o lastRunAt
    await this.prisma.recurringTransaction.update({
      where: { id: recurring.id },
      data: { lastRunAt: now },
    });
  }
}
