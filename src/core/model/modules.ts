export interface ModuleDTO {
  id: string;
  name: string;
  textModule: string | null;
  videoUrl: string | null;
  fileModule: string | null;
  youtubeId: string | null;
  thumbnailUrl: string | null;
  assignment: {
    id: string;
    title: string;
    isFinalAssigment: boolean;
    dueDate: Date;
  } | null;
}

export interface ModuleCreationDTO {
  name: string;
  textModule?: string;
  videoUrl?: string;
  fileModule?: File
}
