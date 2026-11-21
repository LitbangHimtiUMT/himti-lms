import { useState } from "react";
import { FaStar } from "react-icons/fa";
import DefaultImage from "@core/assets/default-photo.svg";
import { Pagination } from "../../_global/components/Pagination";
import { formatTime } from "../../_global/lib/format-time";
import { useClassReviews } from "../hooks/useReviews";
import { ReviewForm } from "./ReviewForm";
import { ReviewStars } from "./ReviewStars";

// Reviews on the class detail page: aggregate header, the review form
// for certificate holders who have not reviewed yet, and the paged
// list. Fail-closed: when the reviews endpoint errors (e.g. an older
// API without it), the whole section hides instead of breaking the
// detail page.
export const ClassReviewsSection: React.FC<{ classId: string }> = ({
  classId,
}) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useClassReviews(classId, page);

  // Loading shows a skeleton in the section's own spot (title +
  // aggregate row + 2 review cards: avatar 40px, name/date, 14px
  // stars, 2 text lines), so the instructor section below does not
  // jump when the reviews land. Errors stay fail-closed: the whole
  // section hides, exactly as before.
  if (isLoading) {
    return (
      <section className="animate-pulse" aria-hidden="true">
        <div className="mb-3 border-b border-slate-100 pb-2">
          <div className="h-7 w-48 bg-slate-200 rounded" />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 bg-slate-200 rounded-full" />
          <div className="h-7 w-10 bg-slate-200 rounded" />
          <div className="h-5 w-28 bg-slate-200 rounded" />
        </div>
        <ul className="space-y-4">
          {[0, 1].map((i) => (
            <li
              key={i}
              className="bg-slate-50 border border-slate-100 rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-slate-200 rounded-full shrink-0" />
                <div className="space-y-1">
                  <div className="h-5 w-32 bg-slate-200 rounded" />
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
              </div>
              <div className="h-4 w-20 bg-slate-200 rounded" />
              <div className="mt-2 space-y-1">
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (isError || !data) {
    return null;
  }

  const reviews = data.data?.reviews ?? [];
  const aggregate = data.data?.aggregate;

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
        Ulasan Peserta
      </h2>

      {aggregate && aggregate.count > 0 && aggregate.average != null && (
        <div className="flex items-center gap-2 mb-4">
          <FaStar size={20} className="text-amber-400" />
          <p className="text-lg font-bold text-slate-800">
            {aggregate.average.toFixed(1)}
          </p>
          <p className="text-sm text-slate-500">
            dari {aggregate.count} ulasan
          </p>
        </div>
      )}

      {data.data?.canReview && (
        <div className="mb-6">
          {/* A new review sorts first (createdAt desc), so go back to
              page 1 after submitting to show the review just sent. */}
          <ReviewForm classId={classId} onSubmitted={() => setPage(1)} />
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-slate-500">Belum ada ulasan.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="bg-slate-50 border border-slate-100 rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.user.photo || DefaultImage}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = DefaultImage)
                  }
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 truncate">
                    {review.user.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatTime(new Date(review.createdAt), false)}
                  </p>
                </div>
              </div>
              <ReviewStars rating={review.rating} />
              {review.text && (
                // Plain text on purpose: review text is never rendered as HTML.
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line mt-2">
                  {review.text}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      <Pagination
        totalPages={data.meta?.totalPages ?? 1}
        currentPage={page}
        onPageChange={setPage}
      />
    </section>
  );
};
