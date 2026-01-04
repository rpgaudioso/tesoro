import { Injectable } from "@nestjs/common";
import {
  CreateCardDto,
  CreatePurchaseDto,
  UpdateCardDto,
} from "@tesoro/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(workspaceId: string, dto: CreateCardDto) {
    return this.prisma.card.create({
      data: {
        workspaceId,
        ...dto,
      },
    });
  }

  async findAll(workspaceId: string) {
    return this.prisma.card.findMany({
      where: { workspaceId },
      orderBy: { name: "asc" },
    });
  }

  async findOne(workspaceId: string, id: string) {
    return this.prisma.card.findFirst({
      where: { id, workspaceId },
    });
  }

  async update(workspaceId: string, id: string, dto: UpdateCardDto) {
    return this.prisma.card.update({
      where: { id },
      data: dto,
    });
  }

  async remove(workspaceId: string, id: string) {
    return this.prisma.card.delete({
      where: { id },
    });
  }

  async getStatement(workspaceId: string, cardId: string, month: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        workspaceId,
        cardId,
        date: {
          gte: new Date(`${month}-01`),
          lt: new Date(
            new Date(`${month}-01`).setMonth(
              new Date(`${month}-01`).getMonth() + 1
            )
          ),
        },
      },
      include: {
        category: true,
        person: true,
      },
      orderBy: { date: "asc" },
    });

    const total = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month,
      cardId,
      transactions,
      total,
    };
  }

  async createPurchase(
    workspaceId: string,
    cardId: string,
    dto: CreatePurchaseDto
  ) {
    const date = typeof dto.date === "string" ? new Date(dto.date) : dto.date;

    if (dto.installments === 1) {
      // Single purchase
      return this.prisma.transaction.create({
        data: {
          workspaceId,
          cardId,
          date,
          description: dto.description,
          amount: dto.amount,
          type: "EXPENSE",
          categoryId: dto.categoryId,
          personId: dto.personId,
        },
      });
    }

    // Installment purchase
    const startMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    return this.prisma.$transaction(async (tx) => {
      const plan = await tx.installmentPlan.create({
        data: {
          workspaceId,
          description: dto.description,
          totalAmount: dto.amount,
          installments: dto.installments,
          startMonth,
        },
      });

      const installmentAmount = dto.amount / dto.installments;
      const installments: any[] = [];

      for (let i = 0; i < dto.installments; i++) {
        const installmentDate = new Date(date);
        installmentDate.setMonth(installmentDate.getMonth() + i);

        const installmentMonth = `${installmentDate.getFullYear()}-${String(installmentDate.getMonth() + 1).padStart(2, "0")}`;

        const transaction = await tx.transaction.create({
          data: {
            workspaceId,
            cardId,
            date: installmentDate,
            description: `${dto.description} (${i + 1}/${dto.installments})`,
            amount: installmentAmount,
            type: "EXPENSE",
            categoryId: dto.categoryId,
            personId: dto.personId,
          },
        });

        const installment = await tx.installment.create({
          data: {
            planId: plan.id,
            installmentNumber: i + 1,
            month: installmentMonth,
            amount: installmentAmount,
            transactionId: transaction.id,
          },
        });

        installments.push(installment);
      }

      return { plan, installments };
    });
  }
}
