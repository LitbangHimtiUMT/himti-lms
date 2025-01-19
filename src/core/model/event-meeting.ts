import { MeetingItem } from "./meeting";

export interface EventMeetingsModel {
  id: string;
  name: string;
  meetingCount: number;
}

export interface EventMeetingCreation {
  name: string;
  description?: string;
}

export interface GeneralEventMeetingRequest {
  eventMeetingId?: string;
  name?: string;
  description?: string;
}

export interface EventMeetingDTO {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  Meeting: MeetingItem[]
}
