import { stickerObject } from "./types";

export const filterTasks = (tasksList: stickerObject[], word: string) => {
  const filter: string = word;
  const filteredTasks: stickerObject[] = tasksList.filter((task) => task.stickerTaskState === filter);
  return filteredTasks;
};
