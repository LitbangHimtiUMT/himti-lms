import { ModuleDTO, SubmissionDTO } from "./modules";

export type AssignmentType = "FILE" | "URL";

export interface CreateAssignmentDTO {
  title: string;
  description?: string;
  dueDate: Date;
  type: AssignmentType;
  allowedFile?: string;
}

export interface AssignmentDTO {
  id: string;
  title: string;
  isFinalAssigment: boolean;
  dueDate: Date;
  allowedFile: string | null;
  description: string;
  type: AssignmentType;
  activeSubmission?: SubmissionDTO | null;
  module?: ModuleDTO;
}
