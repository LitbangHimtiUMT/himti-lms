import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import {
  CreateReviewDTO,
  ReviewDTO,
  ReviewsListResponse,
} from "../model/reviews";

export const reviewsService = {
  getByClass: request.get<ReviewsListResponse>(API_ENDPOINT.reviews),
  create: request.post<ApiResponse<ReviewDTO>, CreateReviewDTO>(
    API_ENDPOINT.reviews
  ),
};
