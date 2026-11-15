import { Button } from "../Button";
import { EmptyState } from "../Empty";

interface QueryErrorStateProps {
  description?: string | string[];
  onRetry: () => void;
  retryLabel?: string;
  customMinHeight?: number | string;
  colspan?: number;
}

// Error state for a failed query: the error variant of EmptyState plus
// a retry button. The message stays static on purpose — the raw error
// is never rendered. Views pass their own copy to match the copy
// around them; the default matches the English table copy.
export const QueryErrorState: React.FC<QueryErrorStateProps> = ({
  description = [
    "Failed to load data.",
    "Please check your connection and try again.",
  ],
  onRetry,
  retryLabel = "Try Again",
  customMinHeight,
  colspan,
}) => {
  return (
    <EmptyState
      variant="error"
      description={description}
      customMinHeight={customMinHeight}
      colspan={colspan}
      action={
        <div className="w-48">
          <Button onClick={() => onRetry()}>{retryLabel}</Button>
        </div>
      }
    />
  );
};
