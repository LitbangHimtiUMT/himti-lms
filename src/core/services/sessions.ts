import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { SessionDTO } from "../model/sessions";

export const sessionService = {
  getByClass: request.get<ApiResponse<SessionDTO[]>>(API_ENDPOINT.sessions),
};
