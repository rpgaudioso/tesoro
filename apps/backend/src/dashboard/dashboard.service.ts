import { Injectable } from "@nestjs/common";
import { DashboardData } from "@tesoro/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(
    workspaceId: string,
    month: string
  ): Promise<DashboardData> {
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    // Get transactions for the month (excluding credit card payments)
    const transactions = await this.prisma.transaction.findMany({
      where: {
        workspaceId,
        date: {
          gte: startDate,
          lt: endDate,
        },
        kind: {
          not: "CREDIT_CARD_PAYMENT", // Exclude card payments from dashboard
        },
      },
      include: { category: true },
    });

    // Get credit card charges for invoices of this month
    const creditCardCharges = await this.prisma.creditCardCharge.findMany({
      where: {
        workspaceId,
        invoice: {
          month: month,
        },
      },
      include: { category: true },
    });

    // Calculate income and expenses
    const income = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);

    const expensesFromTransactions = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);

    const expensesFromCreditCard = creditCardCharges.reduce(
      (sum, c) => sum + c.amount,
      0
    );

    const expenses = expensesFromTransactions + expensesFromCreditCard;
    const balance = income - expenses;

    // Get budgets and calculate spent
    const budgets = await this.prisma.budget.findMany({
      where: { workspaceId, month },
      include: { category: true },
    });

    // Calculate spent by category (transactions + credit card charges)
    const spentByCategory: Record<string, number> = {};

    transactions
      .filter((t) => t.type === "EXPENSE")
      .forEach((t) => {
        spentByCategory[t.categoryId] =
          (spentByCategory[t.categoryId] || 0) + t.amount;
      });

    creditCardCharges.forEach((charge) => {
      if (charge.categoryId) {
        spentByCategory[charge.categoryId] =
          (spentByCategory[charge.categoryId] || 0) + charge.amount;
      }
    });

    const budgetSummary = budgets.map((budget) => {
      const spent = spentByCategory[budget.categoryId] || 0;
      const percentage =
        budget.limitAmount > 0 ? (spent / budget.limitAmount) * 100 : 0;

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
        alerts.push(
          `⚠️ Orçamento de "${item.categoryName}" estourado (${item.percentage.toFixed(0)}%)`
        );
      } else if (item.percentage >= 80) {
        alerts.push(
          `⚡ "${item.categoryName}" perto do limite (${item.percentage.toFixed(0)}%)`
        );
      }
    });

    if (balance < 0) {
      alerts.push(`💸 Saldo negativo no mês: R$ ${balance.toFixed(2)}`);
    }

    return {
      month,
      income,
      expenses,
      balance,
      budgetSummary,
      alerts,
      upcomingBills: [], // Can be implemented later
    };
  }

  async getYearlyBalance(workspaceId: string, isLastYear: boolean = false) {
    const now = new Date();
    const year = isLastYear ? now.getFullYear() - 1 : now.getFullYear();

    const monthlyBalances: Array<{
      month: string;
      monthName: string;
      income: number;
      expenses: number;
      balance: number;
    }> = [];

    // Get all 12 months of the year (January to December)
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const date = new Date(year, monthIndex, 1);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      const startDate = new Date(`${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      const transactions = await this.prisma.transaction.findMany({
        where: {
          workspaceId,
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      const income = transactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = transactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0);

      const balance = income - expenses;

      monthlyBalances.push({
        month,
        monthName: date
          .toLocaleDateString("pt-BR", { month: "short" })
          .toUpperCase(),
        income,
        expenses,
        balance,
      });
    }

    return monthlyBalances;
  }

  async getLast12MonthsBalance(workspaceId: string) {
    const now = new Date();
    const monthlyBalances: Array<{
      month: string;
      monthName: string;
      income: number;
      expenses: number;
      balance: number;
    }> = [];

    // Get last 12 months from current date
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      const startDate = new Date(`${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      const transactions = await this.prisma.transaction.findMany({
        where: {
          workspaceId,
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      const income = transactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = transactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0);

      const balance = income - expenses;

      monthlyBalances.push({
        month,
        monthName: date
          .toLocaleDateString("pt-BR", { month: "short" })
          .toUpperCase(),
        income,
        expenses,
        balance,
      });
    }

    return monthlyBalances;
  }
}
