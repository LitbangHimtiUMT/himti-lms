import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AuthLoginModel } from "@core/model/auth";

export const authService = {
  login: request.post<ApiResponse<AuthLoginModel>>(API_ENDPOINT.login),
  register: request.post<ApiResponse<unknown>>(API_ENDPOINT.register),
  check: request.get<ApiResponse>(API_ENDPOINT.check),
};
