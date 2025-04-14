import { ModuleDTO } from "./modules";

export interface SessionDTO {
  id: string;
  name: string;
  module: ModuleDTO[];
  progress: number
  progressStatus: 'Completed' | 'In Progress'
}

export interface SessionCreationDTO {
  name: string
}
