import { Injectable } from '@nestjs/common';
import { UpdateBudgetsDto } from '@tesoro/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async findByMonth(workspaceId: string, month: string) {
    const budgets = await this.prisma.budget.findMany({
      where: { workspaceId, month },
      include: { category: true },
    });

    // Calculate spent for each category
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        workspaceId,
        type: 'EXPENSE',
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

    const spentByCategory = transactions.reduce((acc, t) => {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    return budgets.map((budget) => ({
      ...budget,
      spent: spentByCategory[budget.categoryId] || 0,
      percentage: budget.limitAmount > 0
        ? ((spentByCategory[budget.categoryId] || 0) / budget.limitAmount) * 100
        : 0,
    }));
  }

  async updateBudgets(workspaceId: string, month: string, dto: UpdateBudgetsDto) {
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
        }),
      ),
    );

    return results;
  }
}
