import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completedModulesService } from "../../../core/services/completed-modules";
import { getErrorMessage } from "../../_global/helper/get-error-message";
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
    onError: (err) => toast.error(getErrorMessage(err)),
    onSuccess: () => {
      toast.success("Module Completed");
      queryClient.invalidateQueries({
        queryKey: ["detail-module"],
      });
      queryClient.invalidateQueries({
        queryKey: ["classesById"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
    },
  });
};
