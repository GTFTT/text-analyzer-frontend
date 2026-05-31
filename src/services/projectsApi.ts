import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateProjectArg,
  Project,
  ProjectChunkItem,
  ProjectsResponse,
  UploadProgress,
  UploadProgressResponse,
  UploadProjectFileArg
} from "../types/Project";
import type { MenuItemI } from "../components/Menu/MenuItemI.ts";
import {normalizeUploadProgress} from "../helpers/uploadProgressUtils.ts";

const API_URL = import.meta.env.VITE_API_URL as string;

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    /** GET /projects — fetch all projects */
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      transformResponse: (response: ProjectsResponse) =>
        response.projects,
    }),
    /** GET /projects — fetch menu items derived from projects */
    getMenuItems: builder.query<MenuItemI[], void>({
      query: () => "/projects",
      transformResponse: (response: ProjectsResponse) =>
        response.projects.map((project) => ({
          id: String(project.project_id),
          label: project.project_name,
        })),
    }),
    /** POST /projects — create project and receive generated project_id */
    createProject: builder.mutation<{ project_id: number }, CreateProjectArg>({
      query: ({ projectName }) => ({
        url: "/projects",
        method: "POST",
        // FastAPI function signature uses a plain parameter, so send it as query param.
        params: { project_name: projectName },
      }),
    }),
    /** POST /projects/{project_id}/upload — upload file for project */
    uploadProjectFile: builder.mutation<unknown, UploadProjectFileArg>({
      query: ({ projectId, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: `/projects/${projectId}/upload`,
          method: "POST",
          body: formData,
        };
      },
    }),
    /** GET /projects/{project_id}/upload/progress — get upload progress */
    getUploadProgress: builder.query<UploadProgress, number>({
      query: (projectId) => `/projects/${projectId}/upload/progress`,
      transformResponse: (response: UploadProgressResponse) =>
        normalizeUploadProgress(response),
    }),
    /** GET /projects/{project_id}/chunks — get generated chunks */
    getProjectChunks: builder.query<ProjectChunkItem[], number>({
      query: (projectId) => `/projects/${projectId}/chunks`,
      transformResponse: (response: { chunks: ProjectChunkItem[] }) => {
        return response.chunks as ProjectChunkItem[];
      },
    }),
  }),
});

// Auto-generated hooks — use these directly in components
export const {
  useGetProjectsQuery,
  useGetMenuItemsQuery,
  useCreateProjectMutation,
  useGetUploadProgressQuery,
  useUploadProjectFileMutation,
  useGetProjectChunksQuery,
} = projectsApi;
