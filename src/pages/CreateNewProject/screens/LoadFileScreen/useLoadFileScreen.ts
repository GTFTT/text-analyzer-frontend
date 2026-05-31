import {useCallback, useEffect, useState} from "react";
import type {ChangeEvent} from "react";
import {useAppDispatch} from "../../../../reduxStore/hooks.ts";
import {
  projectsApi,
  useCreateProjectMutation,
  useGetUploadProgressQuery,
  useUploadProjectFileMutation
} from "../../../../services/projectsApi.ts";

interface UseLoadFileScreenParams {
  onUploadingDone?: () => void;
}

export function useLoadFileScreen({ onUploadingDone }: UseLoadFileScreenParams = {}) {
  const dispatch = useAppDispatch();
  const [createProject, {isLoading: isCreatingProject}] = useCreateProjectMutation();
  const [uploadProjectFile, {isLoading: isUploadingFile, error: uploadProjectError}] = useUploadProjectFileMutation();
  const [activeUploadProjectId, setActiveUploadProjectId] = useState<number | null>(null);
  const {data: uploadProgress} = useGetUploadProgressQuery(activeUploadProjectId ?? 0, {
    skip: activeUploadProjectId === null,
    pollingInterval: activeUploadProjectId !== null ? 100 : 0,
  });
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState("");
  const isUploadFinished = uploadProgress?.isReady || uploadProgress?.isCanceled;
  const isUploading = isCreatingProject || isUploadingFile || (activeUploadProjectId !== null && !isUploadFinished);
  const uploadProgressPercentage = uploadProgress?.percentage ?? 0;
  const trimmedProjectName = projectName.trim();
  const isProjectNameValid = trimmedProjectName.length > 0;
  const isProjectNameErrorVisible = !isProjectNameValid && projectName.length > 0 || projectName.length === 0;
  const isConfirmDisabled = !currentFile || !isProjectNameValid || isUploading;

  useEffect(() => {
    if (uploadProgress?.isReady || uploadProgress?.isCanceled) {
      setActiveUploadProjectId(null);
      if (uploadProgress.isReady) {
        onUploadingDone?.();
      }
    }
  }, [uploadProgress, onUploadingDone]);

  useEffect(() => {
    if (uploadProjectError) {
      setActiveUploadProjectId(null);
    }
  }, [uploadProjectError]);

  const onProjectNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  }, []);

  const onFilesDropped = useCallback((files: FileList) => {
    setCurrentFile(files[0] ?? null);
  }, []);

  const onConfirm = useCallback(async () => {
    if (!currentFile || !isProjectNameValid) {
      return;
    }

    setActiveUploadProjectId(null);
    try {
      const response = await createProject({projectName: trimmedProjectName}).unwrap();
      const projectId = response.project_id;

      if (!projectId) {
        return;
      }

      setActiveUploadProjectId(projectId);
      await uploadProjectFile({projectId, file: currentFile}).unwrap();

      dispatch(projectsApi.endpoints.getMenuItems.initiate(undefined, {forceRefetch: true}));
    } catch {
      // Mutation errors are surfaced via RTK Query error state.
    }
  }, [currentFile, isProjectNameValid, trimmedProjectName, createProject, uploadProjectFile, dispatch]);

  return {
    currentFile,
    projectName,
    isUploading,
    uploadProgressPercentage,
    isProjectNameErrorVisible,
    isConfirmDisabled,
    onProjectNameChange,
    onFilesDropped,
    onConfirm,
  };
}
