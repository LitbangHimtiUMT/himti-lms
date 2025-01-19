import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { CreateAdminUserBodyDTO, UserModel } from "@core/model/user";

export const userService = {
  get: HTTP_REQUEST.get<ApiResponse<UserModel[]>>(API_ENDPOINT.users),
  getById: HTTP_REQUEST.get<ApiResponse<UserModel>>(API_ENDPOINT.users),
  post: HTTP_REQUEST.post<ApiResponse<UserModel>>(API_ENDPOINT.users),
  put: HTTP_REQUEST.put<ApiResponse<UserModel>>(API_ENDPOINT.users),
  delete: HTTP_REQUEST.delete<ApiResponse<void>>(API_ENDPOINT.users),
  createAdmin: HTTP_REQUEST.post<ApiResponse, CreateAdminUserBodyDTO>(API_ENDPOINT.createUser),
  updateAdmin: HTTP_REQUEST.put<ApiResponse, CreateAdminUserBodyDTO>(API_ENDPOINT.users),
};
