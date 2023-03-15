import React, { useRef, useState } from "react";
import { XCircle, Plus } from "react-feather";
import { addBoardCatogorySticker, removeBoardCatogory } from "../boardComponent/boardSlice";
import { useAppDispatch } from "../../app/hooks";
import { categoryObject } from "../../app/types";
import { newSticker } from "../../app/helpers";
import StickerComponent from "../stickerComponent/StickerComponent";
import "./columnStyle.css";
import HeaderComponent from "../headerComponent/HeaderComponent";

type columnProps = {
  categoryObject: categoryObject;
  children?: React.ReactNode;
};

function ColumnComponent({ categoryObject }: columnProps) {
  console.log("ColumnComponent " + categoryObject.categoryName + ":Rendered");
  const dispatch = useAppDispatch();
  const categoryName: string = categoryObject.categoryName;

  // Add new sticker to current category
  const OnClickAddStickerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addBoardCatogorySticker(newSticker(categoryObject)));
  };

  // Remove current category from board
  const DeleteCategoryHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeBoardCatogory(categoryObject));
  };

  return (
    <div className="columnComponent">
      <div className="columnTitle">
        <HeaderComponent title={categoryName} />
        <button title="Delete column" onClick={DeleteCategoryHandler}>
          <XCircle />
        </button>
      </div>

      <ul className="stickerList">
        {categoryObject.stickerList.map((item, key) => {
          return (
            <li className="stickerListItem">
              <StickerComponent key={key} stickerObj={item} />
            </li>
          );
        })}
      </ul>
      <button title="Create sticker" className="addSticker" onClick={OnClickAddStickerHandler}>
        <Plus />
      </button>
    </div>
  );
}

export default ColumnComponent;
