import { useMutation } from "@tanstack/react-query";
import { certificateService } from "../../../../core/services/certificates";
import { toast } from "react-toastify";

export const useGenerateCertificate = () => {
  return useMutation({
    mutationFn: ({ classId }: { classId: string }) => certificateService.generate(undefined, {
        path: `generate/${classId}`,
    }),
    onError: (err) => toast.error(err.message),
    onSuccess: (res) => {
        toast.success(res.message)
    }
  });
};
