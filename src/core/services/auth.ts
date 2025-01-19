import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AuthLoginBodyModel, AuthLoginModel } from "@core/model/auth";

export const authService = {
    login: HTTP_REQUEST.post<ApiResponse<AuthLoginModel>, AuthLoginBodyModel>(API_ENDPOINT.login),
    check: HTTP_REQUEST.get<ApiResponse>(API_ENDPOINT.check),
}