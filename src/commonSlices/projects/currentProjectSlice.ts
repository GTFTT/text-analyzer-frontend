import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../reduxStore";

export const CURRENT_PROJECT_SLICE_NAME = "currentProject";

export type ProjectChatRole = "user" | "assistant";

export interface ProjectChatMessage {
  id: string;
  role: ProjectChatRole;
  text: string;
}

interface CurrentProjectState {
  currentProjectId: number | null;
  currentProjectName: string | null;
  chatHistory: ProjectChatMessage[];
}

const initialState: CurrentProjectState = {
  currentProjectId: null,
  currentProjectName: null,
  chatHistory: [],
};

const currentProjectSlice = createSlice({
  name: CURRENT_PROJECT_SLICE_NAME,
  initialState,
  reducers: {
    setCurrentProjectId: (state, action: PayloadAction<number>) => {
      if (state.currentProjectId !== action.payload) {
        state.chatHistory = [];
        state.currentProjectName = null;
      }
      state.currentProjectId = action.payload;
    },
    setCurrentProjectName: (state, action: PayloadAction<string | null>) => {
      state.currentProjectName = action.payload;
    },
    addProjectChatMessage: (state, action: PayloadAction<ProjectChatMessage>) => {
      state.chatHistory.push(action.payload);
    },
    setProjectChatHistory: (state, action: PayloadAction<ProjectChatMessage[]>) => {
      state.chatHistory = action.payload;
    },
    clearProjectChatHistory: (state) => {
      state.chatHistory = [];
    },
    clearCurrentProjectId: (state) => {
      state.currentProjectId = null;
      state.currentProjectName = null;
      state.chatHistory = [];
    },
  },
});

export const {
  setCurrentProjectId,
  setCurrentProjectName,
  addProjectChatMessage,
  setProjectChatHistory,
  clearProjectChatHistory,
  clearCurrentProjectId,
} = currentProjectSlice.actions;
export const currentProjectReducer = currentProjectSlice.reducer;

export const selectCurrentProjectId = (state: RootState) =>
  state[CURRENT_PROJECT_SLICE_NAME].currentProjectId;

export const selectCurrentProjectName = (state: RootState) =>
  state[CURRENT_PROJECT_SLICE_NAME].currentProjectName;

export const selectCurrentProjectChatHistory = (state: RootState) =>
  state[CURRENT_PROJECT_SLICE_NAME].chatHistory;
