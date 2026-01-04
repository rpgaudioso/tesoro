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
