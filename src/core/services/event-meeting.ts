import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { EventMeetingCreation, EventMeetingDTO, EventMeetingsModel } from "@core/model/event-meeting";

export const eventMeetingService = {
  get: HTTP_REQUEST.get<ApiResponse<EventMeetingsModel[]>>(API_ENDPOINT.eventMeeting),
  create: HTTP_REQUEST.post<ApiResponse, EventMeetingCreation>(API_ENDPOINT.eventMeeting),
  delete: HTTP_REQUEST.delete<ApiResponse>(API_ENDPOINT.eventMeeting),
  update: HTTP_REQUEST.post<ApiResponse, EventMeetingCreation>(API_ENDPOINT.eventMeeting),
  getById: HTTP_REQUEST.get<ApiResponse<EventMeetingDTO>>(API_ENDPOINT.eventMeeting),
}