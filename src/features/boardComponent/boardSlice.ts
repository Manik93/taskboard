import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { boardObject, stickerObject } from "../../app/types";

export interface BoardsState {
  value: boardObject[];
  status: "idle" | "loading" | "failed";
}
//Itinital state from local storage
const initialState: BoardsState = {
  value: [],
  status: "idle",
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<boardObject>) => {
      state.value.push(action.payload);
    },
    deleteBoard: (state, action: PayloadAction<number>) => {
      /* const newState = state.value.filter((item) => item.stickerID === action.payload);
      state.value = newState; */
    },
  },
  extraReducers: (builder) => {},
});

export const { createBoard } = boardSlice.actions;

export const selectSticker = (state: RootState) => state.boards;

export default boardSlice.reducer;
