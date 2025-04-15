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
  } | null;
}

export interface ModuleCreationDTO {
  name: string;
  textModule?: string;
  videoUrl?: string;
  fileModule?: File
}
