import { ModuleDTO, SubmissionDTO } from "./modules";

export type AssignmentType = "FILE" | "URL";

export interface CreateAssignmentDTO {
  id?: string;
  title: string;
  description?: string;
  dueDate: Date;
  type: AssignmentType;
  allowedFile?: string;
}

export interface SubmitAssignmentDTO {
  assignmentId: string;
  file: string | File;
}

export interface AssignmentDTO {
  id: string;
  title: string;
  isFinalAssigment: boolean;
  dueDate: Date;
  createdAt: Date
  allowedFile: string | null;
  description: string;
  type: AssignmentType;
  activeSubmission?: SubmissionDTO | null;
  historySubmission: SubmissionDTO[];
  module?: ModuleDTO;
  isOpen: boolean
  createdBy: {
    id: string;
    name: string;
    photo: string | null;
  }
}
