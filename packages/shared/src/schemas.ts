import { z } from "zod";
import { AccountType, TransactionType } from "./enums";

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
  categoryId: z.string().uuid(),
  accountId: z.string().uuid().optional(),
  personId: z.string().uuid().optional(),
});

export const updateTransactionSchema = z.object({
  date: z.union([z.string(), z.date()]).optional(),
  description: z.string().optional(),
  amount: z.number().positive().optional(),
  type: z.nativeEnum(TransactionType).optional(),
  categoryId: z.string().optional(),
  accountId: z.string().optional(),
  personId: z.string().optional(),
});

// Budget schemas
export const upsertBudgetSchema = z.object({
  categoryId: z.string().uuid(),
  limitAmount: z.number().nonnegative(),
});

export const updateBudgetsSchema = z.object({
  budgets: z.array(upsertBudgetSchema),
});

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
