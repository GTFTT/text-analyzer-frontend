import type {UploadProgress, UploadProgressResponse} from "../types/Project.ts";

export function normalizeUploadProgress(response: UploadProgressResponse): UploadProgress {
  const rawPercentage = response.progress

  const percentage = Math.max(0, Math.min(100, rawPercentage));
  const status = response.status.toLowerCase();
  const isReady = status === "completed";
  const isCanceled = false; // Assuming the API does not provide a canceled status, set to false.

  return {
    percentage: isReady ? 100 : percentage,
    status,
    isReady,
    isCanceled,
  };
}