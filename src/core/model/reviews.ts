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
  average: number | null;
  count: number;
}

// GET /lms/reviews/class/:classId — the envelope only carries `data`
// + `meta`, so the list, its aggregate, and the caller's own review
// state travel together inside `data`; `meta` stays at the envelope
// level. `average` is null when `count` is 0.
export interface ClassReviewsDTO {
  reviews: ReviewDTO[];
  aggregate: ReviewAggregateDTO;
  canReview: boolean;
  myReview: ReviewDTO | null;
}

export type ReviewsListResponse = ApiResponse<ClassReviewsDTO>;

// POST /lms/reviews — userId always comes from the token server-side;
// text is optional and capped at 1000 chars (trimmed, empty means null).
export interface CreateReviewDTO {
  classId: string;
  rating: number;
  text?: string;
}
