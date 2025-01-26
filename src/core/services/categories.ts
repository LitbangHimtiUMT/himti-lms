import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { CategoriesDTO } from "../model/categories";

export const categoriesService = {
  get: request.get<ApiResponse<CategoriesDTO[]>>(API_ENDPOINT.categories),
};
