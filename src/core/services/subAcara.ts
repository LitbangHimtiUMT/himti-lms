import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { SubAcaraModel } from "@core/model/subAcara";
import { AbsensiModel } from "@features/admin/acara/model/absensi";
import { AcaraModel } from "@features/admin/acara/model/acara";


export const subAcaraService = {
  get: HTTP_REQUEST.get<ApiResponse<SubAcaraModel[]>>(API_ENDPOINT.subAcara),
  getAbsensi: HTTP_REQUEST.get<ApiResponse<AbsensiModel[]>>(API_ENDPOINT.absensi),
  getById: HTTP_REQUEST.get<ApiResponse<AcaraModel>>(API_ENDPOINT.subAcara),
  post: HTTP_REQUEST.post<ApiResponse<AcaraModel>>(API_ENDPOINT.subAcara),
  put: HTTP_REQUEST.put<ApiResponse<AcaraModel>>(API_ENDPOINT.subAcara),
  delete: HTTP_REQUEST.delete<ApiResponse<void>>(API_ENDPOINT.subAcara),
};
