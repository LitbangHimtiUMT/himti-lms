import { EventMeetingsModel } from "./event-meeting";

export interface MeetingItem {
  id: string;
  name: string;
  description: string | null;
  startTime: string | Date;
  endTime: string | Date;
  eventMeeting: {
    id: string;
    name: string;
  };
}

export interface MeetingModel {
  eventMeeting: EventMeetingsModel;
  meetings: MeetingItem[];
  meeting: MeetingItem[];
}

export interface CreateMeetingBodyRequest {
  name: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  eventMeetingId?: string;
}

export interface UpdateMeetingBodyRequest {
  name: string;
  description?: string;
  startTime: Date;
  endTime: Date;
}

export interface GeneralMeetingBodyRequest {
  name?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  eventMeetingId?: string;
  meetingId?: string;
}

export interface MeetingDTO {
  id: string;
  name: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  resume?: string;
  isOpen: boolean;
  isAlreadyAttend: boolean;
  eventMeeting: {
    id: string;
    name: string;
  };
}
