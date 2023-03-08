import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { saveState } from "./helpers";
import boardsReducer from "../features/boardComponent/boardSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

store.subscribe(() => {
  saveState({
    boards: store.getState().boards,
  });
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
