import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { CertificateDTO } from "../model/certificates";

export const certificateService = {
    generate: request.post<ApiResponse>(API_ENDPOINT.certificates),
    get: request.get<ApiResponse<CertificateDTO[]>>(API_ENDPOINT.certificates)
}