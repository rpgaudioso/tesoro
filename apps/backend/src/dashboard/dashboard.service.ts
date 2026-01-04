import { Injectable } from '@nestjs/common';
import { DashboardData } from '@tesoro/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(workspaceId: string, month: string): Promise<DashboardData> {
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    // Get transactions for the month
    const transactions = await this.prisma.transaction.findMany({
      where: {
        workspaceId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: { category: true },
    });

    // Calculate income and expenses
    const income = transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    // Get budgets and calculate spent
    const budgets = await this.prisma.budget.findMany({
      where: { workspaceId, month },
      include: { category: true },
    });

    const spentByCategory = transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((acc, t) => {
        acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const budgetSummary = budgets.map((budget) => {
      const spent = spentByCategory[budget.categoryId] || 0;
      const percentage = budget.limitAmount > 0 ? (spent / budget.limitAmount) * 100 : 0;

      return {
        categoryId: budget.categoryId,
        categoryName: budget.category.name,
        limit: budget.limitAmount,
        spent,
        percentage,
      };
    });

    // Generate alerts
    const alerts: string[] = [];

    budgetSummary.forEach((item) => {
      if (item.percentage >= 100) {
        alerts.push(`⚠️ Orçamento de "${item.categoryName}" estourado (${item.percentage.toFixed(0)}%)`);
      } else if (item.percentage >= 80) {
        alerts.push(`⚡ "${item.categoryName}" perto do limite (${item.percentage.toFixed(0)}%)`);
      }
    });

    if (balance < 0) {
      alerts.push(`💸 Saldo negativo no mês: R$ ${balance.toFixed(2)}`);
    }

    // Calculate card impact (future installments)
    const cardImpact = await this.calculateCardImpact(workspaceId, month);

    return {
      month,
      income,
      expenses,
      balance,
      budgetSummary,
      alerts,
      upcomingBills: [], // Can be implemented later
      cardImpact,
    };
  }

  private async calculateCardImpact(workspaceId: string, currentMonth: string) {
    const currentDate = new Date(`${currentMonth}-01`);
    const nextMonths: Array<{ month: string; amount: number }> = [];

    // Get next 6 months
    for (let i = 1; i <= 6; i++) {
      const futureDate = new Date(currentDate);
      futureDate.setMonth(futureDate.getMonth() + i);
      const futureMonth = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}`;

      const installments = await this.prisma.installment.findMany({
        where: {
          month: futureMonth,
          plan: { workspaceId },
        },
      });

      const totalAmount = installments.reduce((sum, inst) => sum + inst.amount, 0);

      if (totalAmount > 0) {
        nextMonths.push({
          month: futureMonth,
          amount: totalAmount,
        });
      }
    }

    return { nextMonths };
  }
}
