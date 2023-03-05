import { boardObject, stickerObject } from "./types";

export const filterTasks = (tasksList: stickerObject[], word: string) => {
  const filter: string = word;
  const filteredTasks: stickerObject[] = tasksList.filter((task) => task.stickerTaskState === filter);
  return filteredTasks;
};

export const newBoard = (/* stickersList: stickerObject[], name: string */) => {
  /*   //generate new category id
  const categoryID: number = parseInt(Math.random().toString().slice(5));
  //filtering stickers from stickersList for category by name
  const categoryStickers = stickersList.filter((item) => item.stickerTaskState === name);
  //console.log('Stickers of ' + name + ':', categoryStickers); */
  const board: boardObject = {
    name: "New board",
    categoryList: [],
  };
  return board;
};
