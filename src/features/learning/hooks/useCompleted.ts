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
      // The enrolled class list shows progress percent and completion
      // status from this data. Removal, not invalidation: the list is
      // not mounted while learning, and refetchOnMount is false
      // repo-wide, so an invalidated inactive query would never
      // refetch when the user returns to the list.
      queryClient.removeQueries({
        queryKey: ["classes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
    },
  });
};
