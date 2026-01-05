import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * Hook que invalida todas as queries quando a workspace muda
 * Garante que todos os dados sejam recarregados quando o usuário alterna workspaces
 */
export function useWorkspaceChange() {
  const { currentWorkspace } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Invalidar todas as queries quando a workspace muda
    queryClient.invalidateQueries();
  }, [currentWorkspace?.id, queryClient]);
}
