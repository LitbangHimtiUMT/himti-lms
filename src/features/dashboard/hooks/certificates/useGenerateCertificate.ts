import { useMutation, useQueryClient } from "@tanstack/react-query";
import { certificateService } from "../../../../core/services/certificates";
import { getErrorMessage } from "../../../_global/helper/get-error-message";
import { toast } from "react-toastify";

export const useGenerateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId }: { classId: string }) =>
      certificateService.generate(undefined, {
        path: `generate/${classId}`,
      }),
    onError: (err) => toast.error(getErrorMessage(err)),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
      // The certificate list has its own cache key. Invalidation
      // refreshes it when mounted; useCertificates also refetches on
      // mount, since the global default never does.
      queryClient.invalidateQueries({
        queryKey: ["certificates"],
      });
      // A generated certificate makes the owner ineligible (one
      // certificate per class), so the hint and meter must go away.
      queryClient.invalidateQueries({
        queryKey: ["certificate-eligibility"],
      });
      toast.success(res?.message || "Sertifikat berhasil dibuat.");
    },
  });
};
