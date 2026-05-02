import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { ProfileModel } from "../model/profile";

export const participantService = {
  getByClass: request.get<
    ApiResponse<Array<{ id: string; user: ProfileModel }>>
  >(API_ENDPOINT.participant),
};
