import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { stickerObject } from "../../app/types";

export interface CounterState {
  value: stickerObject[];
  status: "idle" | "loading" | "failed";
}
//Itinital state from local storage
const initialState: CounterState = {
  value: [
    /*
    { stickerID: 1, stickerTaskState: '123', data: { header: '123', content: '123' } },
    { stickerID: 1, stickerTaskState: '1', data: { header: '123', content: '123' } },
    { stickerID: 1, stickerTaskState: '123', data: { header: '123', content: '123' } }, 
    */
  ],
  status: "idle",
};

export const stickerSlice = createSlice({
  name: "stickers",
  initialState,
  reducers: {
    setStickerHeader: (state, action: PayloadAction<stickerObject>) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].stickerID === action.payload.stickerID) {
          state.value[i].stickerData.header = action.payload.stickerData.header;
        }
      }
    },
    setStickerContent: (state, action: PayloadAction<stickerObject>) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].stickerID === action.payload.stickerID) {
          state.value[i].stickerData.content = action.payload.stickerData.content;
        }
      }
    },
    addSticker: (state, action: PayloadAction<stickerObject>) => {
      state.value.push(action.payload);
    },
    deleteSticker: (state, action: PayloadAction<number>) => {
      const newState = state.value.filter((item) => item.stickerID === action.payload);
      state.value = newState;
    },
  },
  extraReducers: (builder) => {},
});

export const { addSticker, deleteSticker, setStickerHeader, setStickerContent } = stickerSlice.actions;

//export const selectSticker = (state: RootState) => state.stickers;

export default stickerSlice.reducer;
