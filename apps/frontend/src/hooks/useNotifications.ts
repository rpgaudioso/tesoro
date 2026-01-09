import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

export interface Notification {
  id: string;
  workspaceId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  data?: any;
  createdAt: string;
  readAt?: string;
}

export function useNotifications(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ["notifications", workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      const response = await api.get<Notification[]>(
        `/workspaces/${workspaceId}/notifications`
      );
      return response.data;
    },
    enabled: !!workspaceId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useUnreadNotifications(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ["notifications", "unread", workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      const response = await api.get<Notification[]>(
        `/workspaces/${workspaceId}/notifications/unread`
      );
      return response.data;
    },
    enabled: !!workspaceId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useUnreadCount(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ["notifications", "unread", "count", workspaceId],
    queryFn: async () => {
      if (!workspaceId) return { count: 0 };
      const response = await api.get<{ count: number }>(
        `/workspaces/${workspaceId}/notifications/unread/count`
      );
      return response.data;
    },
    enabled: !!workspaceId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useMarkNotificationAsRead(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      await api.patch(
        `/workspaces/${workspaceId}/notifications/${notificationId}/read`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread", "count", workspaceId],
      });
    },
  });
}

export function useMarkAllNotificationsAsRead(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.patch(`/workspaces/${workspaceId}/notifications/read-all`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread", "count", workspaceId],
      });
    },
  });
}

export function useDeleteNotification(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      await api.delete(
        `/workspaces/${workspaceId}/notifications/${notificationId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread", "count", workspaceId],
      });
    },
  });
}
