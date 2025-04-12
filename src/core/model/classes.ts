import { File } from "buffer";
import { CategoriesModel } from "./categories";
import { UserModel } from "./user";

export interface SessionDTO {
  id: string;
  name: string;
}

export interface ClassModel {
  id: string;
  participantId: string
  name: string;
  description: string;
  status: string;
  level: string;
  category: CategoriesModel;
  thumbnail: string;
  price: number;
  creator: UserModel;
  sessions: SessionDTO[];
  progressStatus: 'Completed' | 'In Progress'
  total: {
    module: number;
    completed: number;
    precentage: number;
  };
}

export interface ClassDTO {
  name: string;
  description?: string;
  thumbnail?: File;
  level: "BEGINNER" | "INTERMEDIATE" | "EXPERT";
  categoryId: string;
  price: number;
}
