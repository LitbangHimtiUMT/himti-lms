import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateReviewDTO } from "@core/model/reviews";
import { reviewsService } from "@core/services/reviews";
import { getErrorMessage } from "../../_global/helper/get-error-message";
import { toast } from "react-toastify";

export const useClassReviews = (
  classId?: string,
  page: number = 1,
  perPage: number = 10,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["class-reviews", classId, { page, perPage }],
    queryFn: () =>
      reviewsService.getByClass({
        path: `class/${classId}`,
        queryParams: { page, perPage },
      }),
    enabled: !!classId && enabled,
    // The global default is refetchOnMount: false; canReview must be
    // fresh every time a surface showing it mounts, or a just-claimed
    // certificate leaves a stale "cannot review" state behind (same
    // lesson as useCertificateEligibility).
    refetchOnMount: true,
    // Keep the previous page visible while the next one loads, so
    // paging does not unmount the list and the form above it.
    placeholderData: keepPreviousData,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewDTO) =>
      reviewsService.create(payload),
    onError: (err) => toast.error(getErrorMessage(err)),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["class-reviews"],
      });
      // The new review changes the aggregate on every surface that
      // shows it. The class list/detail hooks never refetch on mount,
      // so their caches are removed outright (M5 lesson); the stats
      // hook refetches on mount, so invalidation is enough there.
      queryClient.removeQueries({ queryKey: ["classes"] });
      queryClient.removeQueries({ queryKey: ["classesById"] });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
      toast.success(res?.message || "Ulasan berhasil dikirim.");
    },
  });
};
