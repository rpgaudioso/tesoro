import api from "./api";

// Workspaces
export const getWorkspaces = () => api.get("/workspaces");

export const createWorkspace = (data: { name: string }) =>
  api.post("/workspaces", data);

export const updateWorkspace = (
  id: string,
  data: { name?: string; personIds?: string[] }
) => api.patch(`/workspaces/${id}`, data);

export const deleteWorkspace = (id: string) => api.delete(`/workspaces/${id}`);

// People
export const getPeople = () => api.get("/people");

export const createPerson = (data: { name: string; color?: string }) =>
  api.post("/people", data);

export const updatePerson = (
  id: string,
  data: {
    name?: string;
    color?: string;
    active?: boolean;
    photoUrl?: string;
    removePhoto?: boolean;
  },
  file?: File
) => {
  const formData = new FormData();
  formData.append("name", data.name || "");
  formData.append("color", data.color || "");
  if (data.active !== undefined) {
    formData.append("active", String(data.active));
  }
  if (data.removePhoto) {
    formData.append("removePhoto", "true");
  }
  if (file) {
    formData.append("photo", file);
  }

  return api.patch(`/people/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deletePerson = (id: string) => api.delete(`/people/${id}`);

// Accounts
export const getAccounts = () => api.get("/accounts");

export const createAccount = (data: {
  name: string;
  type: "CHECKING" | "CASH" | "SAVINGS" | "INVESTMENT";
  initialBalance?: number;
}) => api.post("/accounts", data);

export const updateAccount = (id: string, data: any) =>
  api.patch(`/accounts/${id}`, data);

export const deleteAccount = (id: string) => api.delete(`/accounts/${id}`);

// Cards
export const getCards = () => api.get("/cards");

export const createCard = (data: {
  name: string;
  closingDay?: number;
  dueDay?: number;
  limit?: number;
}) => api.post("/cards", data);

export const updateCard = (id: string, data: any) =>
  api.patch(`/cards/${id}`, data);

export const deleteCard = (id: string) => api.delete(`/cards/${id}`);
