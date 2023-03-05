export type stickerData = {
  header?: string;
  content?: string;
};

export type stickerObject = {
  stickerID: number;
  stickerTaskState: string;
  data: stickerData;
};

export type categoryObject = {
  categoryID: number;
  categoryTaskState: string;
  data: stickerObject[];
};

export type boardObject = {
  name: string;
  categoryList: categoryObject[];
};
