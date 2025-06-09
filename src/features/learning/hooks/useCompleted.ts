import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completedModulesService } from "../../../core/services/completed-modules";
import { ApiResponse } from "../../../core/libs/api/types";
import { toast } from "react-toastify";

interface CompletedModuleProps {
  moduleId: string;
  type: "complete" | "next";
}

export const useCompletedModules = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      moduleId,
    }: CompletedModuleProps) =>
      completedModulesService.completed(undefined, {
        path: moduleId,
      }),
    onError: (err: ApiResponse) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Module Completed");
      queryClient.invalidateQueries({
        queryKey: ["detail-module"],
      });
      queryClient.invalidateQueries({
        queryKey: ["classesById"],
      });
    },
  });
};
