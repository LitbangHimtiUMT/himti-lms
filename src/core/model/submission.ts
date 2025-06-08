import { SubmissionStatus } from "../../features/dashboard/components/modules/detail-modules/DetailModuleContent";
import { AssignmentDTO } from "./assignments";

export interface SubmissionDTO {
  id: string;
  submittedBy: string;
  file: string;
  status: SubmissionStatus;
  createdAt: Date;
  updatedAt: Date;
  assignment: AssignmentDTO;
  actionBy: {
    id: string;
    name: string;
  } | null;
  createdBy: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    photo: string | null
  };
}
