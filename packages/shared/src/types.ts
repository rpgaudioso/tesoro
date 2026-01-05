import {
  AccountType,
  ImportStatus,
  MemberRole,
  TransactionType,
} from "./enums";

export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Member {
  id: string;
  workspaceId: string;
  userId: string;
  role: MemberRole;
}

export interface Person {
  id: string;
  workspaceId: string;
  name: string;
  color?: string;
  active: boolean;
}

export interface Category {
  id: string;
  workspaceId: string;
  name: string;
  type?: string;
  icon?: string;
  color?: string;
  monthlyLimit?: number;
}

export interface Account {
  id: string;
  workspaceId: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  active: boolean;
}

export interface Card {
  id: string;
  workspaceId: string;
  name: string;
  closingDay?: number;
  dueDay?: number;
  limit?: number;
  active: boolean;
}

export interface Budget {
  id: string;
  workspaceId: string;
  categoryId: string;
  month: string;
  limitAmount: number;
}

export interface Transaction {
  id: string;
  workspaceId: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  accountId?: string;
  cardId?: string;
  personId?: string;
  installmentId?: string;
  createdAt: Date;
}

export interface InstallmentPlan {
  id: string;
  workspaceId: string;
  description: string;
  totalAmount: number;
  installments: number;
  startMonth: string;
}

export interface Installment {
  id: string;
  planId: string;
  installmentNumber: number;
  month: string;
  amount: number;
  transactionId?: string;
}

export interface ImportBatch {
  id: string;
  workspaceId: string;
  status: ImportStatus;
  createdAt: Date;
}

export interface ImportedRow {
  id: string;
  batchId: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  suggestedCategoryId?: string;
  suggestedPersonId?: string;
  confirmed: boolean;
}

export interface DashboardData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
  budgetSummary: BudgetSummaryItem[];
  alerts: string[];
  upcomingBills: any[];
  cardImpact: {
    nextMonths: CardImpactMonth[];
  };
}

export interface BudgetSummaryItem {
  categoryId: string;
  categoryName: string;
  limit: number;
  spent: number;
  percentage: number;
}

export interface CardImpactMonth {
  month: string;
  amount: number;
}
