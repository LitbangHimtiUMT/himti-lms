import { ClassModel, InviteMentorDTO, JoinInvitationClassDTO, MentorClassDTO } from "@core/model/classes";
import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";

export const classesService = {
  get: request.get<ApiResponse<ClassModel[]>>(API_ENDPOINT.classes),
  getById: request.get<ApiResponse<ClassModel>>(API_ENDPOINT.classes),
  mentor: request.get<ApiResponse<MentorClassDTO[]>>(API_ENDPOINT.classes),
  inviteMentor: request.post<ApiResponse, InviteMentorDTO>(`${API_ENDPOINT.classes}/invite`),
  post: request.post<ApiResponse<void>, FormData>(API_ENDPOINT.classes),
  put: request.put<ApiResponse<void>>(API_ENDPOINT.classes),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.classes),
  joinInvitation: request.post<
    ApiResponse<JoinInvitationClassDTO>,
    Omit<JoinInvitationClassDTO, "classId">
  >(API_ENDPOINT.classes),
  publish: request.patch<ApiResponse>(API_ENDPOINT.classes),
};
