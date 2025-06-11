import { useMutation, useQueryClient } from "@tanstack/react-query";
import { certificateService } from "../../../../core/services/certificates";
import { toast } from "react-toastify";

export const useGenerateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId }: { classId: string }) =>
      certificateService.generate(undefined, {
        path: `generate/${classId}`,
      }),
    onError: (err) => toast.error(err.message),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
      toast.success(res.message);
    },
  });
};
