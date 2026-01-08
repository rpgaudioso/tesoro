export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export enum AccountType {
  CHECKING = "CHECKING",
  CASH = "CASH",
  SAVINGS = "SAVINGS",
  INVESTMENT = "INVESTMENT",
}

export enum MemberRole {
  OWNER = "OWNER",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

export enum ImportStatus {
  CREATED = "CREATED",
  UPLOADED = "UPLOADED",
  PARSED = "PARSED",
  CONFIRMED = "CONFIRMED",
  FAILED = "FAILED",
}

export enum TransactionKind {
  DEFAULT = "DEFAULT",
  TRANSFER = "TRANSFER",
  CREDIT_CARD_PAYMENT = "CREDIT_CARD_PAYMENT",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export enum CreditCardStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum CreditCardChargeType {
  PURCHASE = "PURCHASE",
  REFUND = "REFUND",
  FEE = "FEE",
  INTEREST = "INTEREST",
  ADJUSTMENT = "ADJUSTMENT",
}

export enum CreditCardInvoiceStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  PAID = "PAID",
}

export enum RecurringFrequency {
  MINUTELY = "MINUTELY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}
