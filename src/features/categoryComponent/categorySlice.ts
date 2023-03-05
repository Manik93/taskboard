import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { categoryObject, stickerObject } from "../../app/types";

export interface categoryState {
  value: categoryObject[];
  status: "idle" | "loading" | "failed";
}

const initialState: categoryState = {
  value: [],
  status: "idle",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<categoryObject>) => {
      console.log("addCategoryAction");
      state.value = [...state.value, action.payload];
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      const newState = state.value.filter((item) => item.categoryID !== action.payload);
      state.value = newState;
    },
    addStickerToCategory: (state, action: PayloadAction<stickerObject>) => {
      console.log("addStickerAction");
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].categoryTaskState === action.payload.stickerTaskState) {
          state.value[i].data.push(action.payload);
        }
      }
    },
    deleteStickerFromCategory: (state, action: PayloadAction<stickerObject>) => {
      for (let i = 0; i < state.value.length; i++) {
        for (let j = 0; j < state.value[i].data.length; j++) {
          if (state.value[i].data[j].stickerID === action.payload.stickerID) {
            state.value[i].data = state.value[i].data.filter((item) => item.stickerID !== action.payload.stickerID);
          }
        }
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { addCategory, deleteCategory, addStickerToCategory, deleteStickerFromCategory } = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category;

export default categorySlice.reducer;
