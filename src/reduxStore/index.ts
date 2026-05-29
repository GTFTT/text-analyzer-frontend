import {configureStore} from "@reduxjs/toolkit";
import {MENU_SLICE_NAME, menuSliceReducer} from "../components/Menu/menuSlice.ts";

export const store = configureStore({
  reducer: {
    [MENU_SLICE_NAME]: menuSliceReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;