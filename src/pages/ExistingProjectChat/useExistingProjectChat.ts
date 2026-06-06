import {useEffect, useMemo, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {useParams} from "react-router";
import {
  addProjectChatMessage,
  clearProjectChatHistory,
  selectCurrentProjectChatHistory,
  selectCurrentProjectId,
  selectCurrentProjectName,
  setProjectChatHistory,
  setCurrentProjectId,
} from "../../commonSlices/projects/currentProjectSlice.ts";
import type {ProjectChatMessage} from "../../commonSlices/projects/currentProjectSlice.ts";
import {useAppDispatch, useAppSelector} from "../../reduxStore/hooks.ts";
import {
  useAskProjectQuestionMutation,
  useDeleteProjectChatHistoryMutation,
  useGetLatestProjectChatHistoryQuery,
} from "../../services/projectsApi.ts";

function generateMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useExistingProjectChat() {
  const dispatch = useAppDispatch();
  const {projectId: projectIdParam} = useParams();
  const currentProjectId = useAppSelector(selectCurrentProjectId);
  const currentProjectName = useAppSelector(selectCurrentProjectName);
  const chatHistory = useAppSelector(selectCurrentProjectChatHistory);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [askProjectQuestion, {isLoading}] = useAskProjectQuestionMutation();
  const [deleteProjectChatHistory, {isLoading: isDeletingChatHistory}] =
    useDeleteProjectChatHistoryMutation();

  const parsedProjectId = useMemo(() => {
    if (!projectIdParam) {
      return null;
    }

    const value = Number(projectIdParam);
    return Number.isNaN(value) ? null : value;
  }, [projectIdParam]);

  useEffect(() => {
    if (parsedProjectId === null) {
      return;
    }

    if (currentProjectId !== parsedProjectId) {
      dispatch(setCurrentProjectId(parsedProjectId));
    }
  }, [dispatch, currentProjectId, parsedProjectId]);

  const {
    data: latestChatHistory,
    isFetching: isLoadingLatestChatHistory,
    isError: isLatestChatHistoryError,
  } = useGetLatestProjectChatHistoryQuery(
    { projectId: parsedProjectId ?? 0, limit: 20 },
    { skip: parsedProjectId === null }
  );

  useEffect(() => {
    if (!latestChatHistory) {
      return;
    }

    const mappedMessages: ProjectChatMessage[] = latestChatHistory.map((message, index) => {
      const role = message.role === "assistant" ? "assistant" : "user";
      return {
        id: `${message.created_at}-${index}`,
        role,
        text: message.content,
      };
    });

    dispatch(setProjectChatHistory(mappedMessages));
  }, [dispatch, latestChatHistory]);

  useEffect(() => {
    if (!isLatestChatHistoryError) {
      return;
    }

    setErrorMessage("Unable to load latest chat history right now. Please try again.");
  }, [isLatestChatHistoryError]);

  const isWaitingForResponse = isLoading;
  const isChatHistoryLoading = isLoadingLatestChatHistory;
  const isDeleteHistoryDisabled =
    currentProjectId === null ||
    isWaitingForResponse ||
    isChatHistoryLoading ||
    isDeletingChatHistory;

  const isSubmitDisabled = useMemo(() => {
    return currentProjectId === null || query.trim().length === 0 || isWaitingForResponse || isChatHistoryLoading;
  }, [currentProjectId, query, isWaitingForResponse, isChatHistoryLoading]);

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (
      currentProjectId === null ||
      trimmedQuery.length === 0 ||
      isWaitingForResponse ||
      isChatHistoryLoading
    ) {
      return;
    }

    setErrorMessage("");
    dispatch(
      addProjectChatMessage({
        id: generateMessageId(),
        role: "user",
        text: trimmedQuery,
      })
    );

    setQuery("");

    try {
      const response = await askProjectQuestion({
        projectId: currentProjectId,
        query: trimmedQuery,
      }).unwrap();

      dispatch(
        addProjectChatMessage({
          id: generateMessageId(),
          role: "assistant",
          text: response.answer,
        })
      );
    } catch {
      setErrorMessage("Unable to fetch an answer right now. Please try again.");
    }
  };

  const onDeleteHistoryClick = async () => {
    if (currentProjectId === null || isDeletingChatHistory) {
      return;
    }

    setErrorMessage("");
    try {
      await deleteProjectChatHistory(currentProjectId).unwrap();
      dispatch(clearProjectChatHistory());
    } catch {
      setErrorMessage("Unable to delete chat history right now. Please try again.");
    }
  };

  return {
    parsedProjectId,
    currentProjectId,
    currentProjectName,
    chatHistory,
    query,
    errorMessage,
    isWaitingForResponse,
    isChatHistoryLoading,
    isDeletingChatHistory,
    isDeleteHistoryDisabled,
    isSubmitDisabled,
    onQueryChange,
    onDeleteHistoryClick,
    onSubmit,
  };
}

