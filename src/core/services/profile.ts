import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { ProfileModel } from "@core/model/profile";

export const profileService = {
  get: request.get<ApiResponse<ProfileModel>>(API_ENDPOINT.profile),
};
