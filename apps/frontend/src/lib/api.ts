import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const workspaceId = localStorage.getItem("workspaceId");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (workspaceId) {
      config.headers["x-workspace-id"] = workspaceId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("workspaceId");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const resetUserData = (autoSeed: boolean = false) =>
  api.post("/auth/reset-user-data", { autoSeed });

// ==================== CREDIT CARDS ====================

export const creditCardsApi = {
  // Credit Cards
  createCard: (workspaceId: string, data: any) =>
    api.post(`/workspaces/${workspaceId}/credit-cards`, data),
  
  getCards: (workspaceId: string) =>
    api.get(`/workspaces/${workspaceId}/credit-cards`),
  
  getCard: (workspaceId: string, cardId: string) =>
    api.get(`/workspaces/${workspaceId}/credit-cards/${cardId}`),
  
  updateCard: (workspaceId: string, cardId: string, data: any) =>
    api.patch(`/workspaces/${workspaceId}/credit-cards/${cardId}`, data),
  
  deleteCard: (workspaceId: string, cardId: string) =>
    api.delete(`/workspaces/${workspaceId}/credit-cards/${cardId}`),

  // Invoices
  ensureInvoice: (workspaceId: string, cardId: string, month: string) =>
    api.post(`/workspaces/${workspaceId}/credit-cards/${cardId}/invoices/ensure`, { month }),
  
  getCardInvoices: (workspaceId: string, cardId: string, from?: string, to?: string) =>
    api.get(`/workspaces/${workspaceId}/credit-cards/${cardId}/invoices`, {
      params: { from, to },
    }),
  
  getInvoice: (workspaceId: string, invoiceId: string) =>
    api.get(`/workspaces/${workspaceId}/invoices/${invoiceId}`),
  
  closeInvoice: (workspaceId: string, invoiceId: string) =>
    api.post(`/workspaces/${workspaceId}/invoices/${invoiceId}/close`),
  
  payInvoice: (workspaceId: string, invoiceId: string, data: any) =>
    api.post(`/workspaces/${workspaceId}/invoices/${invoiceId}/pay`, data),
  
  getPayment: (workspaceId: string, invoiceId: string) =>
    api.get(`/workspaces/${workspaceId}/invoices/${invoiceId}/payment`),

  // Charges
  createCharge: (workspaceId: string, invoiceId: string, data: any) =>
    api.post(`/workspaces/${workspaceId}/invoices/${invoiceId}/charges`, data),
  
  getCharges: (workspaceId: string, invoiceId: string, categoryId?: string, q?: string) =>
    api.get(`/workspaces/${workspaceId}/invoices/${invoiceId}/charges`, {
      params: { categoryId, q },
    }),
  
  updateCharge: (workspaceId: string, chargeId: string, data: any) =>
    api.patch(`/workspaces/${workspaceId}/charges/${chargeId}`, data),
  
  deleteCharge: (workspaceId: string, chargeId: string) =>
    api.delete(`/workspaces/${workspaceId}/charges/${chargeId}`),
};

export default api;
