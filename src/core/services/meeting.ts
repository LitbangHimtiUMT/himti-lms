import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import {
  CreateMeetingBodyRequest,
  MeetingDTO,
  MeetingItem,
  MeetingModel,
  UpdateMeetingBodyRequest,
} from "@core/model/meeting";

export const meetingService = {
  get: HTTP_REQUEST.get<ApiResponse<MeetingModel>>(API_ENDPOINT.meeting),
  getAll: HTTP_REQUEST.get<ApiResponse<MeetingItem[]>>(API_ENDPOINT.meeting),
  create: HTTP_REQUEST.post<ApiResponse, CreateMeetingBodyRequest>(
    API_ENDPOINT.meeting
  ),
  delete: HTTP_REQUEST.delete<ApiResponse>(API_ENDPOINT.meeting),
  update: HTTP_REQUEST.put<ApiResponse, UpdateMeetingBodyRequest>(
    API_ENDPOINT.meeting
  ),
  getById: HTTP_REQUEST.get<ApiResponse<MeetingDTO>>(API_ENDPOINT.meeting),
};
