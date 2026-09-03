import { configureStore } from "@reduxjs/toolkit";
import { searchPanelReducer } from "./slices/searchPanelSlice";

export const store = configureStore({
  reducer: {
    searchPanelStore: searchPanelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
