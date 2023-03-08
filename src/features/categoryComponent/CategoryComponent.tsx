import React from "react";
import { addBoardCatogorySticker, removeBoardCatogory } from "../boardComponent/boardSlice";
import { useAppDispatch } from "../../app/hooks";
import { categoryObject } from "../../app/types";
import { newSticker } from "../../app/helpers";
import StickerComponent from "../stickerComponent/StickerComponent";
import "./categoryStyle.css";

type categoryProps = {
  categoryObject: categoryObject;
  children?: React.ReactNode;
};

function CategoryComponent({ categoryObject }: categoryProps) {
  console.log("CategoryComponent " + categoryObject.categoryName + ":Rendered");
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
    <div className="boardComponent">
      <div className="categoryTitle">
        <h1>{categoryName}</h1>
        <button onClick={DeleteCategoryHandler}>{"x"}</button>
      </div>
      <button className="addSticker" onClick={OnClickAddStickerHandler}>
        {"+"}
      </button>
      <ul className="stickersList">
        {categoryObject.stickerList.map((item, key) => {
          return (
            <li className="stickersListItem">
              <StickerComponent key={key} stickerObj={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryComponent;
