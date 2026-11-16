import { FaRegStar, FaStar } from "react-icons/fa";

const STAR_LABELS = [1, 2, 3, 4, 5];

// Read-only stars for a submitted review.
export const ReviewStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <span
      role="img"
      aria-label={`${rating} dari 5 bintang`}
      className="inline-flex items-center gap-0.5"
    >
      {STAR_LABELS.map((value) =>
        value <= rating ? (
          <FaStar key={value} size={14} className="text-amber-400" />
        ) : (
          <FaRegStar key={value} size={14} className="text-slate-300" />
        )
      )}
    </span>
  );
};

// Star picker for the review form: real buttons, so it works with
// keyboard and screen readers without custom key handling.
export const ReviewStarInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}> = ({ value, onChange, disabled }) => {
  return (
    <div role="group" aria-label="Rating" className="flex items-center gap-1">
      {STAR_LABELS.map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          aria-label={`Beri ${star} bintang`}
          aria-pressed={value === star}
          onClick={() => onChange(star)}
          className="p-1 text-2xl transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {star <= value ? (
            <FaStar className="text-amber-400" />
          ) : (
            <FaRegStar className="text-slate-300" />
          )}
        </button>
      ))}
    </div>
  );
};
