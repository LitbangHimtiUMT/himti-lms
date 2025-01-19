import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { StrukturalModel } from "@features/admin/struktural/model/struktural";

export const strukturalService = {
  get: HTTP_REQUEST.get<ApiResponse<StrukturalModel[]>>(API_ENDPOINT.struktural),
  getById: HTTP_REQUEST.get<ApiResponse<StrukturalModel>>(API_ENDPOINT.struktural),
  post: HTTP_REQUEST.post<ApiResponse<StrukturalModel>>(API_ENDPOINT.struktural),
  put: HTTP_REQUEST.put<ApiResponse<StrukturalModel>>(API_ENDPOINT.struktural),
  delete: HTTP_REQUEST.delete<ApiResponse<void>>(API_ENDPOINT.struktural),
};
