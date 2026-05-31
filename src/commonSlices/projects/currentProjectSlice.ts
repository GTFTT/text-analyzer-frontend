import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const CURRENT_PROJECT_SLICE_NAME = "currentProject";

interface CurrentProjectState {
  currentProjectId: number | null;
}

const initialState: CurrentProjectState = {
  currentProjectId: null,
};

const currentProjectSlice = createSlice({
  name: CURRENT_PROJECT_SLICE_NAME,
  initialState,
  reducers: {
    setCurrentProjectId: (state, action: PayloadAction<number>) => {
      state.currentProjectId = action.payload;
    },
    clearCurrentProjectId: (state) => {
      state.currentProjectId = null;
    },
  },
});

export const { setCurrentProjectId, clearCurrentProjectId } = currentProjectSlice.actions;
export const currentProjectReducer = currentProjectSlice.reducer;

export const selectCurrentProjectId = (
  state: { [CURRENT_PROJECT_SLICE_NAME]: CurrentProjectState }
) => state[CURRENT_PROJECT_SLICE_NAME].currentProjectId;
