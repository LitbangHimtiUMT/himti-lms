import { CategoriesModel } from "./categories";
import { UserModel } from "./user";
import { ModuleDTO } from "./modules";
import { CourseType } from "../../features/dashboard/store";

export type StatusClasses = 'PUBLISH' | 'DRAFT' | 'ARCHIVED'
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
  // True when the caller is the class creator or a co-mentor.
  // Only the class detail response carries it; absence (list
  // responses, guests) is treated as false.
  isClassMentor?: boolean;
  status: StatusClasses;
  // null = not completed. Optional: list responses from an older API
  // may not carry it; absence is treated as not completed.
  completedAt?: string | null;
  // Count of issued certificates. Only the class detail response
  // carries it; absence is treated as zero.
  totalCertificates?: number;
  // Aggregate rating. Only present when the API sends it (the list
  // endpoint may not); absence hides the catalog badge.
  rating?: { average: number | null; count: number } | null;
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