import { selectCurrentProjectId } from "../../../../commonSlices/projects/currentProjectSlice.ts";
import { useAppSelector } from "../../../../reduxStore/hooks.ts";
import { useGetProjectChunksQuery } from "../../../../services/projectsApi.ts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getErrorMessage(error: unknown): string {
  if (!error) {
    return "Unknown error.";
  }

  if (typeof error === "string") {
    return error;
  }

  if (isRecord(error)) {
    const data = error.data;
    if (typeof data === "string") {
      return data;
    }

    if (isRecord(data) && typeof data.detail === "string") {
      return data.detail;
    }

    if (typeof error.error === "string") {
      return error.error;
    }
  }

  return "Failed to load project data.";
}

function formatEmbeddingPreview(values: number[]): string {
  if (values.length === 0) {
    return "Empty embedding.";
  }

  const preview = values.slice(0, 6).map((value) => value.toFixed(4)).join(", ");
  if (values.length <= 6) {
    return `[${preview}]`;
  }

  return `[${preview}, ...] (${values.length} dims)`;
}

export function useChunksOverviewScreen() {
  const currentProjectId = useAppSelector(selectCurrentProjectId);
  const shouldSkip = currentProjectId === null;

  const {
    data: chunkItems = [],
    isLoading,
    isError,
    error,
  } = useGetProjectChunksQuery(currentProjectId ?? 0, { skip: shouldSkip });

  return {
    currentProjectId,
    chunkItems,
    isLoading,
    isError,
    errorMessage: getErrorMessage(error),
    formatEmbeddingPreview,
  };
}

