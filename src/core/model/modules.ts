import { SubmissionStatus } from "../../features/dashboard/components/modules/detail-modules/DetailModuleContent";

export interface SubmissionDTO {
  id: string;
  file: string;
  status: SubmissionStatus;
  feedback: string | null;
  submittedAt: Date;
  submittedBy?: {
    id: string;
    name: string;
  }
}

export interface ModuleDTO {
  id: string;
  name: string;
  textModule: string | null;
  videoUrl: string | null;
  file: {
    fileName: string | null;
    url: string | null;
  }
  youtubeId: string | null;
  thumbnailUrl: string | null;
  assignment: {
    id: string;
    title: string;
    isFinalAssigment: boolean;
    dueDate: Date;
    allowedFile: string | null
    description: string
    activeSubmission?: SubmissionDTO | null;
    historySubmission?: SubmissionDTO[]
  } | null;
  createdBy: {
    id: string;
    name: string
  }
  isCompleted: boolean
}

export interface ModuleCreationDTO {
  name: string;
  textModule?: string;
  videoUrl?: string;
  fileModule?: File
}
