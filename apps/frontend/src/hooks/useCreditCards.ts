import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { creditCardsApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, CreditCardInvoice, InvoiceWithDetails, CreditCardCharge } from '@tesoro/shared';

// ==================== CREDIT CARDS ====================

export function useCreditCards() {
  const { workspaceId } = useAuth();

  return useQuery<CreditCard[]>({
    queryKey: ['credit-cards', workspaceId],
    queryFn: async () => {
      const { data } = await creditCardsApi.getCards(workspaceId!);
      return data;
    },
    enabled: !!workspaceId,
  });
}

export function useCreditCard(cardId: string) {
  const { workspaceId } = useAuth();

  return useQuery({
    queryKey: ['credit-cards', workspaceId, cardId],
    queryFn: async () => {
      const { data } = await creditCardsApi.getCard(workspaceId!, cardId);
      return data;
    },
    enabled: !!workspaceId && !!cardId,
  });
}

export function useCreateCreditCard() {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => creditCardsApi.createCard(workspaceId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-cards', workspaceId] });
    },
  });
}

export function useUpdateCreditCard(cardId: string) {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => creditCardsApi.updateCard(workspaceId!, cardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-cards', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['credit-cards', workspaceId, cardId] });
    },
  });
}

export function useDeleteCreditCard() {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: string) => creditCardsApi.deleteCard(workspaceId!, cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-cards', workspaceId] });
    },
  });
}

// ==================== INVOICES ====================

export function useInvoices(cardId: string, from?: string, to?: string) {
  const { workspaceId } = useAuth();

  return useQuery<CreditCardInvoice[]>({
    queryKey: ['invoices', workspaceId, cardId, from, to],
    queryFn: async () => {
      const { data } = await creditCardsApi.getCardInvoices(workspaceId!, cardId, from, to);
      return data;
    },
    enabled: !!workspaceId && !!cardId,
  });
}

export function useInvoice(invoiceId: string) {
  const { workspaceId } = useAuth();

  return useQuery<InvoiceWithDetails>({
    queryKey: ['invoices', workspaceId, invoiceId],
    queryFn: async () => {
      const { data } = await creditCardsApi.getInvoice(workspaceId!, invoiceId);
      return data;
    },
    enabled: !!workspaceId && !!invoiceId,
  });
}

export function useEnsureInvoice() {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, month }: { cardId: string; month: string }) =>
      creditCardsApi.ensureInvoice(workspaceId!, cardId, month),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invoices', workspaceId, variables.cardId] });
    },
  });
}

export function useCloseInvoice() {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoiceId: string) => creditCardsApi.closeInvoice(workspaceId!, invoiceId),
    onSuccess: (_, invoiceId) => {
      queryClient.invalidateQueries({ queryKey: ['invoices', workspaceId, invoiceId] });
      queryClient.invalidateQueries({ queryKey: ['invoices', workspaceId] });
    },
  });
}

export function usePayInvoice() {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ invoiceId, data }: { invoiceId: string; data: any }) =>
      creditCardsApi.payInvoice(workspaceId!, invoiceId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invoices', workspaceId, variables.invoiceId] });
      queryClient.invalidateQueries({ queryKey: ['invoices', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', workspaceId] });
    },
  });
}

// ==================== CHARGES ====================

export function useInvoiceCharges(invoiceId: string, categoryId?: string, q?: string) {
  const { workspaceId } = useAuth();

  return useQuery<CreditCardCharge[]>({
    queryKey: ['charges', workspaceId, invoiceId, categoryId, q],
    queryFn: async () => {
      const { data } = await creditCardsApi.getCharges(workspaceId!, invoiceId, categoryId, q);
      return data;
    },
    enabled: !!workspaceId && !!invoiceId,
  });
}

export function useCreateCharge() {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ invoiceId, data }: { invoiceId: string; data: any }) =>
      creditCardsApi.createCharge(workspaceId!, invoiceId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['charges', workspaceId, variables.invoiceId] });
      queryClient.invalidateQueries({ queryKey: ['invoices', workspaceId, variables.invoiceId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['budgets', workspaceId] });
    },
  });
}

export function useUpdateCharge() {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chargeId, data }: { chargeId: string; data: any }) =>
      creditCardsApi.updateCharge(workspaceId!, chargeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['charges', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['invoices', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['budgets', workspaceId] });
    },
  });
}

export function useDeleteCharge() {
  const { workspaceId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chargeId: string) => creditCardsApi.deleteCharge(workspaceId!, chargeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['charges', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['invoices', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['budgets', workspaceId] });
    },
  });
}
