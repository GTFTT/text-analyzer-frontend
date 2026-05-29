import {configureStore} from "@reduxjs/toolkit";
// import {HEADER_SLICE_NAME, headerSliceReducer} from "../compoentns/Header/headerSlice.ts";

export const store = configureStore({
  reducer: {
    // [HEADER_SLICE_NAME]: headerSliceReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;