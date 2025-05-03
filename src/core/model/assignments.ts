export type AssignmentType = "FILE" | "URL";

export interface CreateAssignmentDTO {
  title: string;
  description?: string;
  dueDate: Date;
  type: AssignmentType;
  allowedFile?: string;
}
