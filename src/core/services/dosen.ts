import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { DosenModel } from "@core/model/dosen";

export const dosenService = {
  get: HTTP_REQUEST.get<ApiResponse<DosenModel[]>>(API_ENDPOINT.dosen),
  getById: HTTP_REQUEST.get<ApiResponse<DosenModel>>(API_ENDPOINT.dosen),
  post: HTTP_REQUEST.post<ApiResponse<DosenModel>>(API_ENDPOINT.dosen),
  put: HTTP_REQUEST.put<ApiResponse<DosenModel>>(API_ENDPOINT.dosen),
  delete: HTTP_REQUEST.delete<ApiResponse<void>>(API_ENDPOINT.dosen),
};
