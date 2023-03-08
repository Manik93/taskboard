import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { boardObject, categoryObject, stickerObject } from "../../app/types";

export interface BoardsState {
  value: boardObject[];
  status: "idle" | "loading" | "failed";
}

const initialState: BoardsState = {
  value: [],
  status: "idle",
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // Adding new boardObject to array of boardObjects
    createBoard: (state, action: PayloadAction<boardObject>) => {
      state.value.push(action.payload);
    },
    // Filer current boardObjects state by boardID
    deleteBoard: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((item) => item.boardID !== action.payload);
    },
    // Adding new categoryObject to active boardObject.categoryList[]
    addBoardCatogory: (state, action: PayloadAction<categoryObject>) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].boardID === action.payload.parentBoardID && state.value[i].isActive) {
          state.value[i].categoryList.push(action.payload);
        }
      }
    },
    // Removing categoryObject from active boardObject.categoryList[] by categoryID
    removeBoardCatogory: (state, action: PayloadAction<categoryObject>) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].boardID === action.payload.parentBoardID && state.value[i].isActive) {
          state.value[i].categoryList = state.value[i].categoryList.filter(
            (item) => item.categoryID !== action.payload.categoryID
          );
        }
      }
    },
    // Adding new stickerObject to active boardObject.categoryList[] item by categoryID
    addBoardCatogorySticker: (state, action: PayloadAction<stickerObject>) => {
      for (let i = 0; i < state.value.length; i++) {
        for (let j = 0; j < state.value[i].categoryList.length; j++) {
          if (
            state.value[i].categoryList[j].categoryID === action.payload.parentCategoryID &&
            state.value[i].isActive
          ) {
            state.value[i].categoryList[j].stickerList.push(action.payload);
          }
        }
      }
    },
    // Removing stickerObject from active boardObject.categoryList[] item by categoryID
    removeBoardCatogorySticker: (state, action: PayloadAction<stickerObject>) => {
      for (let i = 0; i < state.value.length; i++) {
        for (let j = 0; j < state.value[i].categoryList.length; j++) {
          if (
            state.value[i].categoryList[j].categoryID === action.payload.parentCategoryID &&
            state.value[i].isActive
          ) {
            state.value[i].categoryList[j].stickerList = state.value[i].categoryList[j].stickerList.filter(
              (item) => item.stickerID !== action.payload.stickerID
            );
          }
        }
      }
    },
    // Setting boardObject active by boardID
    setActiveBoard: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].boardID === action.payload) {
          state.value[i].isActive = true;
        } else {
          state.value[i].isActive = false;
        }
      }
    },
    changeBoardName: (state, action: PayloadAction<string>) => {
      /* const newState = state.value.filter((item) => item.stickerID === action.payload);
        state.value = newState; */
    },
    // Setting sticker header
    setStickerHeader: (state, action: PayloadAction<stickerObject>) => {
      // Looking for proper category by stickerObject.parentCategoryID
      for (let i = 0; i < state.value.length; i++) {
        for (let j = 0; j < state.value[i].categoryList.length; j++) {
          if (
            state.value[i].categoryList[j].categoryID === action.payload.parentCategoryID &&
            state.value[i].isActive
          ) {
            // Looking for sickerObject by stickerObject.stickerID and setting new header value
            for (let k = 0; k < state.value[i].categoryList[j].stickerList.length; k++) {
              if (state.value[i].categoryList[j].stickerList[k].stickerID === action.payload.stickerID) {
                state.value[i].categoryList[j].stickerList[k].stickerData.header = action.payload.stickerData.header;
              }
            }
          }
        }
      }
    },
    // Setting sticker header
    setStickerContent: (state, action: PayloadAction<stickerObject>) => {
      // Looking for proper category by stickerObject.parentCategoryID
      for (let i = 0; i < state.value.length; i++) {
        for (let j = 0; j < state.value[i].categoryList.length; j++) {
          if (
            state.value[i].categoryList[j].categoryID === action.payload.parentCategoryID &&
            state.value[i].isActive
          ) {
            // Looking for sickerObject by stickerObject.stickerID and setting new header value
            for (let k = 0; k < state.value[i].categoryList[j].stickerList.length; k++) {
              if (state.value[i].categoryList[j].stickerList[k].stickerID === action.payload.stickerID) {
                state.value[i].categoryList[j].stickerList[k].stickerData.content = action.payload.stickerData.content;
              }
            }
          }
        }
      }
    },
  },
  extraReducers: (builder) => {},
});

export const {
  createBoard,
  deleteBoard,
  addBoardCatogory,
  removeBoardCatogory,
  addBoardCatogorySticker,
  removeBoardCatogorySticker,
  setActiveBoard,
  changeBoardName,
  setStickerHeader,
  setStickerContent,
} = boardSlice.actions;

export const selectBoard = (state: RootState) => state.boards;

export default boardSlice.reducer;
