import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AngkatanDTO, AngkatanModel } from "@core/model/angkatan";

export const angkatanService = {
    get: HTTP_REQUEST.get<ApiResponse<AngkatanModel[]>>(API_ENDPOINT.angkatan),
    post: HTTP_REQUEST.post<ApiResponse, AngkatanDTO>(API_ENDPOINT.angkatan),
    put: HTTP_REQUEST.put<ApiResponse, AngkatanDTO>(API_ENDPOINT.angkatan),
    getById: HTTP_REQUEST.get<ApiResponse<AngkatanModel>>(API_ENDPOINT.angkatan),
    delete: HTTP_REQUEST.delete<ApiResponse>(API_ENDPOINT.angkatan)
}