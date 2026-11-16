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

  if (isError || isLoading || !data) {
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
