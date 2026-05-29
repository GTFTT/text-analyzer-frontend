import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../reduxStore";
import type {MenuItemI} from "./MenuItemI.ts";

export const MENU_SLICE_NAME = "menuSlice";

interface MenuState {
  isMenuOpened: boolean;
  menuItems: MenuItemI[];
}

const initialState: MenuState = {
  isMenuOpened: false,
  menuItems: [],
};

const menuSlice = createSlice({
  name: MENU_SLICE_NAME,
  initialState,
  reducers: {
    setMenuItemsAction: (state, action: PayloadAction<MenuItemI[]>) => {
      state.menuItems = action.payload;
    },
  }
})

// Selectors
export const selectMenuItems = (state: RootState) =>
  state[MENU_SLICE_NAME].menuItems;

// Actions
export const {
  setMenuItemsAction,
} = menuSlice.actions;

// Reducer
export const menuSliceReducer = menuSlice.reducer;