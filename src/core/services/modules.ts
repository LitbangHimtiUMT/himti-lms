import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { ModuleDTO } from "../model/modules";

export const moduleService = {
    getBySession: request.get<ApiResponse<ModuleDTO[]>>(API_ENDPOINT.modules)
}