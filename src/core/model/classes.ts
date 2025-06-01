import { File } from "buffer";
import { CategoriesModel } from "./categories";
import { UserModel } from "./user";
import { ModuleDTO } from "./modules";

export type StatusClassess = 'PUBLISH' | 'DRAFT'

export interface SessionDTO {
  id: string;
  name: string;
  modules: ModuleDTO[]
}


export interface ClassModel {
  id: string;
  participantId: string;
  name: string;
  description: string;
  isAlreadyJoin: boolean;
  status: StatusClassess;
  code?: string;
  level: string;
  category: CategoriesModel;
  totalSession: number
  thumbnail: string;
  price: number;
  creator: UserModel;
  sessions: SessionDTO[];
  progressStatus: "Completed" | "In Progress";
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

