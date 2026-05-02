import { ChangeEvent } from "react";

export type Role = "ADMIN" | "USER" | "ANGGOTA";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  photo: string;
}

export interface UserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: Role | "" | ChangeEvent<HTMLSelectElement>;
  nim?: string;
  anggotaId?: string | ChangeEvent<HTMLSelectElement>;
}

export interface CreateAdminUserBodyDTO {
  name: string;
  email: string;
  password?: string;
  nim?: string;
  code?: string;
}
