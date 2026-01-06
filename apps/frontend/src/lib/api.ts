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

export default api;
