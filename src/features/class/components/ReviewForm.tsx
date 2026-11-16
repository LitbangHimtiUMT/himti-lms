import { useState } from "react";
import { Button } from "../../_global/components/Button";
import { TextArea } from "../../_global/components/TextArea";
import { useCreateReview } from "../hooks/useReviews";
import { ReviewStarInput, ReviewStars } from "./ReviewStars";

const REVIEW_TEXT_MAX_LENGTH = 1000;

// One-shot review form: pick stars, write an optional review, confirm
// on a preview step, then submit. There is no edit or delete — the
// confirmation step says so before anything is sent.
export const ReviewForm: React.FC<{
  classId: string;
  onSubmitted: () => void;
}> = ({ classId, onSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [confirming, setConfirming] = useState(false);
  const mutation = useCreateReview();

  const trimmedText = text.trim();

  const handleSubmit = () => {
    if (rating < 1 || rating > 5 || mutation.isPending) return;
    mutation.mutate(
      {
        classId,
        rating,
        ...(trimmedText ? { text: trimmedText } : {}),
      },
      {
        onSuccess: () => {
          setRating(0);
          setText("");
          setConfirming(false);
          onSubmitted();
        },
      }
    );
  };

  if (confirming) {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
        <h3 className="font-semibold text-slate-800">Konfirmasi Ulasan</h3>
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <ReviewStars rating={rating} />
          {trimmedText ? (
            // Plain text on purpose: review text is never rendered as HTML.
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {trimmedText}
            </p>
          ) : (
            <p className="text-sm text-slate-400 italic">Tanpa teks ulasan.</p>
          )}
        </div>
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          Ulasan tidak bisa diubah atau dihapus setelah dikirim. Pastikan
          rating dan ulasan Anda sudah benar.
        </p>
        <div className="flex gap-2">
          <div className="flex-1">
            <Button
              variant={mutation.isPending ? "disabled" : "secondary"}
              onClick={() => setConfirming(false)}
            >
              Batal
            </Button>
          </div>
          <div className="flex-1">
            <Button
              variant={mutation.isPending ? "disabled" : "primary"}
              onClick={handleSubmit}
            >
              {mutation.isPending ? "Mengirim..." : "Kirim Ulasan"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
      <h3 className="font-semibold text-slate-800">Beri Rating & Ulasan</h3>
      <div>
        <p className="text-sm text-slate-600 mb-1">Rating Anda</p>
        <ReviewStarInput value={rating} onChange={setRating} />
      </div>
      <div>
        <label
          htmlFor="review-text"
          className="block text-sm text-slate-600 mb-1"
        >
          Ulasan (opsional)
        </label>
        <TextArea
          id="review-text"
          style={{ resize: "none", height: "8rem" }}
          value={text}
          maxLength={REVIEW_TEXT_MAX_LENGTH}
          placeholder="Ceritakan pengalaman belajar Anda di kelas ini..."
          onChange={(e) => setText(e.target.value)}
        />
        <p className="text-xs text-slate-400 mt-1 text-right">
          {text.length}/{REVIEW_TEXT_MAX_LENGTH}
        </p>
      </div>
      <div className="sm:w-48">
        <Button
          variant={rating === 0 ? "disabled" : "primary"}
          onClick={() => setConfirming(true)}
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
};
