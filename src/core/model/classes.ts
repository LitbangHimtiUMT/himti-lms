import { File } from "buffer";
import { CategoriesModel } from "./categories";
import { UserModel } from "./user";

export interface ClassModel {
  id: number;
  name: string;
  description: string;
  status: string;
  level: string;
  category: CategoriesModel;
  thumbnail: string;
  price: number;
  creator: UserModel;
}

export interface ClassDTO {
  name: string;
  description?: string;
  thumbnail?: File;
  level: "BEGINNER" | "INTERMEDIATE" | "EXPERT";
  categoryId: string;
  price: number;
}
