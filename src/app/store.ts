import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import stickerReducer from "../features/stickerComponent/stickerSlice";
import categoryReducer from "../features/categoryComponent/categorySlice";

export const store = configureStore({
  reducer: {
    stickers: stickerReducer,
    category: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
