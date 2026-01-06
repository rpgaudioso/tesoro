import { Injectable } from "@nestjs/common";
import { UpdateBudgetsDto } from "@tesoro/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async findByMonth(workspaceId: string, month: string) {
    const budgets = await this.prisma.budget.findMany({
      where: { workspaceId, month },
      include: { category: true },
    });

    // Calculate spent for each category (transactions + credit card charges)
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    // Get transactions (excluding credit card payments)
    const transactions = await this.prisma.transaction.findMany({
      where: {
        workspaceId,
        type: "EXPENSE",
        kind: {
          not: "CREDIT_CARD_PAYMENT",
        },
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        categoryId: true,
        amount: true,
      },
    });

    // Get credit card charges for invoices of this month
    const creditCardCharges = await this.prisma.creditCardCharge.findMany({
      where: {
        workspaceId,
        invoice: {
          month: month,
        },
      },
      select: {
        categoryId: true,
        amount: true,
      },
    });

    // Aggregate spent by category
    const spentByCategory: Record<string, number> = {};

    transactions.forEach((t) => {
      spentByCategory[t.categoryId] =
        (spentByCategory[t.categoryId] || 0) + t.amount;
    });

    creditCardCharges.forEach((charge) => {
      if (charge.categoryId) {
        spentByCategory[charge.categoryId] =
          (spentByCategory[charge.categoryId] || 0) + charge.amount;
      }
    });

    return budgets.map((budget) => ({
      ...budget,
      spent: spentByCategory[budget.categoryId] || 0,
      percentage:
        budget.limitAmount > 0
          ? ((spentByCategory[budget.categoryId] || 0) / budget.limitAmount) *
            100
          : 0,
    }));
  }

  async updateBudgets(
    workspaceId: string,
    month: string,
    dto: UpdateBudgetsDto
  ) {
    const results = await Promise.all(
      dto.budgets.map((budget) =>
        this.prisma.budget.upsert({
          where: {
            workspaceId_categoryId_month: {
              workspaceId,
              categoryId: budget.categoryId,
              month,
            },
          },
          create: {
            workspaceId,
            categoryId: budget.categoryId,
            month,
            limitAmount: budget.limitAmount,
          },
          update: {
            limitAmount: budget.limitAmount,
          },
          include: { category: true },
        })
      )
    );

    return results;
  }
}
