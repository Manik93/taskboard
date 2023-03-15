import { selectBoard } from "../features/boardComponent/boardSlice";
import { RootState, store } from "../app/store";
import { boardObject, categoryObject, stickerObject } from "./types";

export const filterTasks = (tasksList: stickerObject[], word: string) => {
  const filter: string = word;
  const filteredTasks: stickerObject[] = tasksList.filter((task) => task.stickerTaskState === filter);
  return filteredTasks;
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const newBoard = () => {
  const boardList = selectBoard(store.getState());

  // Generating new boardID
  const newBoardID: number = parseInt(Math.random().toString().slice(8));

  const board: boardObject = {
    boardID: newBoardID,
    isActive: false,
    name: `Board ${boardList.value.length + 1}`,
    categoryList: [],
  };
  return board;
};

// Generating new sticker for current category
export const newSticker = (parentCategoryObject: categoryObject) => {
  // Generating new stickerID
  const stickerID: number = parseInt(Math.random().toString().slice(2));

  const sticker: stickerObject = {
    parentCategoryID: parentCategoryObject.categoryID,
    stickerID: stickerID,
    stickerTaskState: parentCategoryObject.categoryName,
    stickerData: { header: "", content: "" },
  };
  return sticker;
};

//new category object with stickers
export const newCategory = (name: string, parentBoardID: number) => {
  // Generating new categoryID
  const categoryID: number = parseInt(Math.random().toString().slice(5));

  let category: categoryObject = {
    parentBoardID: parentBoardID,
    categoryID: categoryID,
    categoryName: name,
    stickerList: [],
  };

  category = { ...category, stickerList: [newSticker(category)] };
  return category;
};
