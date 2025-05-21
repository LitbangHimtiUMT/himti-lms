import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";

export const certificateService = {
    generate: request.post<ApiResponse>(API_ENDPOINT.certificates)
}