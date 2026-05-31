import { configureStore } from "@reduxjs/toolkit";
import { MENU_SLICE_NAME, menuSliceReducer } from "../components/Menu/menuSlice.ts";
import { projectsApi } from "../services/projectsApi.ts";

export const store = configureStore({
  reducer: {
    [MENU_SLICE_NAME]: menuSliceReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore known RTK Query non-serializable fetch metadata and file args.
        ignoredActionPaths: [
          "meta.arg.originalArgs.file",
          "meta.baseQueryMeta.request",
          "meta.baseQueryMeta.response",
        ],
      },
    }).concat(projectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;