import { ApiResponse } from "../libs/api/types";

export interface ReviewUserDTO {
  id: string;
  name: string;
  photo: string | null;
}

export interface ReviewDTO {
  id: string;
  rating: number;
  text: string | null;
  createdAt: string;
  user: ReviewUserDTO;
}

export interface ReviewAggregateDTO {
  average: number;
  count: number;
}

// GET /lms/reviews/class/:classId — aggregate, canReview, and myReview
// are optional: an older API that does not send them must hide the
// rating surfaces instead of crashing (fail-closed, like eligibility).
export interface ReviewsListResponse extends ApiResponse<ReviewDTO[]> {
  aggregate?: ReviewAggregateDTO | null;
  canReview?: boolean;
  myReview?: ReviewDTO | null;
}

// POST /lms/reviews — userId always comes from the token server-side;
// text is optional and capped at 1000 chars (trimmed, empty means null).
export interface CreateReviewDTO {
  classId: string;
  rating: number;
  text?: string;
}
