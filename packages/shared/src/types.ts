import {
  AccountType,
  CreditCardChargeType,
  CreditCardInvoiceStatus,
  CreditCardStatus,
  ImportStatus,
  MemberRole,
  RecurringFrequency,
  TransactionKind,
  TransactionStatus,
  TransactionType,
} from "./enums.js";

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
  status: TransactionStatus;
  kind: TransactionKind;
  categoryId: string;
  accountId?: string;
  personId?: string;
  paymentMethod?: string;
  creditCardId?: string;
  installments?: number;
  competenceMonth?: string;
  createdAt: Date;
  // Relations
  category?: Category;
  account?: Account;
  person?: Person;
  creditCard?: CreditCard;
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
}

export interface BudgetSummaryItem {
  categoryId: string;
  categoryName: string;
  limit: number;
  spent: number;
  percentage: number;
}

export interface CreditCard {
  id: string;
  workspaceId: string;
  name: string;
  brand?: string;
  last4?: string;
  currency: string;
  creditLimit: number;
  closingDay: number;
  dueDay: number;
  paymentAccountId?: string;
  status: CreditCardStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditCardInvoice {
  id: string;
  workspaceId: string;
  creditCardId: string;
  month: string;
  status: CreditCardInvoiceStatus;
  closedAt?: Date;
  dueDate?: Date;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditCardCharge {
  id: string;
  workspaceId: string;
  creditCardId: string;
  invoiceId: string;
  type: CreditCardChargeType;
  description: string;
  purchaseDate: Date;
  postedAt?: Date;
  amount: number;
  categoryId?: string;
  personId?: string;
  externalId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditCardInvoicePayment {
  id: string;
  workspaceId: string;
  invoiceId: string;
  transactionId?: string;
  accountId: string;
  paidAt: Date;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceWithDetails extends CreditCardInvoice {
  creditCard?: CreditCard;
  charges?: CreditCardCharge[];
  totalsByCategory?: CategoryTotal[];
  payment?: CreditCardInvoicePayment;
}

export interface CategoryTotal {
  categoryId: string;
  categoryName: string;
  categoryIcon?: string;
  categoryColor?: string;
  total: number;
}

export interface RecurringTransaction {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  amount: number;
  type: TransactionType;
  frequency: RecurringFrequency;
  dayOfMonth?: number;
  dayOfWeek?: number;
  startDate: Date;
  endDate?: Date;
  categoryId: string;
  accountId?: string;
  personId?: string;
  isActive: boolean;
  lastRunAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
