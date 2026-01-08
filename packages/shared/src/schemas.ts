import { z } from "zod";
import {
  AccountType,
  RecurringFrequency,
  TransactionStatus,
  TransactionType,
} from "./enums.js";

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Workspace schemas
export const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(100),
});

// Person schemas
export const createPersonSchema = z.object({
  name: z.string().min(1).max(100),
  color: z.string().optional(),
});

export const updatePersonSchema = createPersonSchema.partial().extend({
  active: z.boolean().optional(),
  removePhoto: z.boolean().optional(),
});

// Category schemas
export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["INCOME", "EXPENSE"]),
  icon: z.string().optional(),
  color: z.string().optional(),
  monthlyLimit: z.number().nonnegative().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

// Account schemas
export const createAccountSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.nativeEnum(AccountType),
  initialBalance: z.number().default(0),
});

export const updateAccountSchema = createAccountSchema.partial().extend({
  active: z.boolean().optional(),
});

// Transaction schemas
export const createTransactionSchema = z.object({
  date: z.string().or(z.date()),
  description: z.string().min(1).max(500),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  status: z.nativeEnum(TransactionStatus).default(TransactionStatus.PENDING),
  categoryId: z.string().uuid(),
  accountId: z.string().uuid().optional(),
  personId: z.string().uuid().optional(),
  paymentMethod: z.string().optional(),
  creditCardId: z.string().uuid().optional(),
  installments: z.number().int().min(1).max(99).optional(),
});

export const updateTransactionSchema = z.object({
  date: z.union([z.string(), z.date()]).optional(),
  description: z.string().optional(),
  amount: z.number().positive().optional(),
  type: z.nativeEnum(TransactionType).optional(),
  status: z.nativeEnum(TransactionStatus).optional(),
  categoryId: z.string().optional(),
  accountId: z.string().optional(),
  personId: z.string().optional(),
  paymentMethod: z.string().optional(),
  creditCardId: z.string().uuid().optional(),
  installments: z.number().int().min(1).max(99).optional(),
});

// Budget schemas
export const upsertBudgetSchema = z.object({
  categoryId: z.string().uuid(),
  limitAmount: z.number().nonnegative(),
});

export const updateBudgetsSchema = z.object({
  budgets: z.array(upsertBudgetSchema),
});

// Recurring Transaction schemas
export const createRecurringTransactionSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  frequency: z.nativeEnum(RecurringFrequency),
  dayOfMonth: z.number().int().min(1).max(31).optional(),
  dayOfWeek: z.number().int().min(0).max(6).optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional(),
  categoryId: z.string().uuid(),
  accountId: z.string().uuid().optional(),
  personId: z.string().uuid().optional(),
  isActive: z.boolean().default(true),
});

export const updateRecurringTransactionSchema =
  createRecurringTransactionSchema.partial();

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>;
export type CreatePersonDto = z.infer<typeof createPersonSchema>;
export type UpdatePersonDto = z.infer<typeof updatePersonSchema>;
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
export type CreateAccountDto = z.infer<typeof createAccountSchema>;
export type UpdateAccountDto = z.infer<typeof updateAccountSchema>;
export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof updateTransactionSchema>;
export type UpsertBudgetDto = z.infer<typeof upsertBudgetSchema>;
export type UpdateBudgetsDto = z.infer<typeof updateBudgetsSchema>;
export type CreateRecurringTransactionDto = z.infer<
  typeof createRecurringTransactionSchema
>;
export type UpdateRecurringTransactionDto = z.infer<
  typeof updateRecurringTransactionSchema
>;
