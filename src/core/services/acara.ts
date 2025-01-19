import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AcaraDetailModel, AcaraModel } from "@features/admin/acara/model/acara";

export const acaraService = {
  get: HTTP_REQUEST.get<ApiResponse<AcaraModel[]>>(API_ENDPOINT.acara),
  getById: HTTP_REQUEST.get<ApiResponse<AcaraDetailModel>>(API_ENDPOINT.acara),
  post: HTTP_REQUEST.post<ApiResponse<AcaraModel>>(API_ENDPOINT.acara),
  put: HTTP_REQUEST.put<ApiResponse<AcaraModel>>(API_ENDPOINT.acara),
  delete: HTTP_REQUEST.delete<ApiResponse<void>>(API_ENDPOINT.acara),
};
