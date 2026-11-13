import { File } from "buffer";
import { CategoriesModel } from "./categories";
import { UserModel } from "./user";
import { ModuleDTO } from "./modules";
import { CourseType } from "../../features/dashboard/store";

export type StatusClasses = 'PUBLISH' | 'DRAFT'
export type ProgressStatus = "Completed" | "In Progress"

export interface SessionDTO {
  id: string;
  name: string;
  isCompleted: boolean;
  modules: ModuleDTO[]
}


export interface ClassModel {
  id: string;
  participantId: string;
  name: string;
  description: string;
  isAlreadyJoin: boolean;
  status: StatusClasses;
  code?: string;
  level: CourseType;
  category: CategoriesModel;
  totalSession: number
  thumbnail: string;
  thumbnailFileSize: number;
  price: number;
  creator: UserModel;
  sessions: SessionDTO[];
  progressStatus: ProgressStatus;
  totalParticipant: number
  total: {
    module: number;
    completed: number;
    precentage: number;
  };
  certificate: {
    id: string
    code: string
    classId: string
    userId: string
  } | null
}

export type ClassLevel = "BEGINNER" | "INTERMEDIATE" | "EXPERT"

export interface ClassDTO {
  name: string;
  description?: string;
  thumbnail?: File;
  level: ClassLevel;
  categoryId: string;
  price: number;
}

export interface JoinInvitationClassDTO {
  classId: string;
  code: string;
}

export interface MentorClassDTO {
  id: string
  user: {
    id: string
    name: string
    email: string
    photo: string | null
  }
}

export interface InviteMentorDTO {
  classId: string
  mentorId: string
}