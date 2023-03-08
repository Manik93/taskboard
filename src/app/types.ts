export type stickerData = {
  header?: string;
  content?: string;
};

export type stickerObject = {
  stickerID: number;
  parentCategoryID: number;
  stickerTaskState: string;
  stickerData: stickerData;
};

export type categoryObject = {
  parentBoardID: number;
  categoryID: number;
  categoryName: string;
  stickerList: stickerObject[];
};

export type boardObject = {
  boardID: number;
  isActive: boolean;
  name: string;
  categoryList: categoryObject[];
};
