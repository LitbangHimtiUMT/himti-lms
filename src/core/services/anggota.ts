import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AnggotaModel } from "@core/model/anggota";

export const anggotaService = {
  get: HTTP_REQUEST.get<ApiResponse<AnggotaModel[]>>(API_ENDPOINT.anggota),
  getById: HTTP_REQUEST.get<ApiResponse<AnggotaModel>>(API_ENDPOINT.anggota),
  post: HTTP_REQUEST.post<ApiResponse<AnggotaModel>>(API_ENDPOINT.anggota),
  put: HTTP_REQUEST.put<ApiResponse<AnggotaModel>>(API_ENDPOINT.anggota),
  delete: HTTP_REQUEST.delete<ApiResponse<void>>(API_ENDPOINT.anggota),
};
