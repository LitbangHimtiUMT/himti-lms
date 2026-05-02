import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";

export const completedModulesService = {
    completed: request.post<ApiResponse>(API_ENDPOINT.completedModules)
}