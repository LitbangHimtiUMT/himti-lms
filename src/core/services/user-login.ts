import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { UserLoginModel } from "@core/model/user-login";

export const userLoginService = {
    get: HTTP_REQUEST.get<ApiResponse<UserLoginModel[]>>(API_ENDPOINT.userLogin),

}