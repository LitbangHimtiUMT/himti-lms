import { useQuery } from "@tanstack/react-query";
import { certificateService } from "../../../core/services/certificates";

export const useCertificateEligibility = (
  classId?: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["certificate-eligibility", classId],
    queryFn: () =>
      certificateService.eligibility({
        path: `eligibility/${classId}`,
      }),
    enabled: !!classId && enabled,
    // The global default is refetchOnMount: false; eligibility must
    // be fresh every time a surface showing it mounts, or a
    // just-approved assignment leaves a stale "not eligible" state
    // behind (same lesson as useCertificates). Mutations that change
    // eligibility invalidate this key; the remount refetch covers
    // the inactive case.
    refetchOnMount: true,
  });
};
