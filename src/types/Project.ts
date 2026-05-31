export interface Project {
  project_id: string;
  project_name: string;
}

export type ProjectsResponse = {
  projects: Project[];
};

export interface UploadProjectFileArg {
  projectId: number;
  file: File;
}

export interface CreateProjectArg {
  projectName: string;
}

export type UploadProgressResponse = {
  progress: number;
  status: string;
  current: number;
  total: number;
};

export interface UploadProgress {
  percentage: number;
  status: string;
  isReady: boolean;
  isCanceled: boolean;
}

export interface ProjectChunkItem {
  id: string;
  chunk: string;
  embedding: number[];
}
