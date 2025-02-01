import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { MentorDTO } from "../model/mentor";

export const mentorService = {
  get: request.get<ApiResponse<MentorDTO[]>>(API_ENDPOINT.mentors),
};
