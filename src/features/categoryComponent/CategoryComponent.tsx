import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { categoryObject, stickerObject } from '../../app/types';
import { filterTasks } from '../../app/helpers';
import { addStickerToCategory, deleteCategory } from '../categoryComponent/categorySlice';
import StickerComponent from '../stickerComponent/StickerComponent';
import './categoryStyle.css';
import { addSticker } from '../stickerComponent/stickerSlice';

type categoryProps = {
  tasksList: stickerObject[];
  taskState: string;
  categoryObject: categoryObject;
  children?: React.ReactNode;
};

//generate new sticker for current category
const newSticker = (category: string) => {
  //generate new sticker id
  const stickerID: number = parseInt(Math.random().toString().slice(2));
  const sticker: stickerObject = {
    stickerID: stickerID,
    stickerTaskState: category,
    data: { header: '', content: '' },
  };
  return sticker;
};

const CategoryComponent = ({ tasksList, categoryObject }: categoryProps) => {
  console.log('CategoryComponent ' + categoryObject.categoryTaskState + ':Rendered', tasksList);
  const dispatch = useAppDispatch();
  const header: string = categoryObject.categoryTaskState;

  const filteredTasks = filterTasks(tasksList, categoryObject.categoryTaskState);
  console.log('CATEGORY_COMPONENT:', filteredTasks, header);
  //add sticker button handler
  const OnClickAddStickerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addStickerToCategory(newSticker(header)));
    dispatch(addSticker(newSticker(header)));
  };

  const handleOnClickDelete = () => {
    dispatch(deleteCategory(categoryObject.categoryID));
  };

  return (
    <div className="boardComponent">
      <div className="categoryTitle">
        <h1>{header}</h1>
        <button onClick={handleOnClickDelete}>{'x'}</button>
      </div>

      <button className="addSticker" onClick={OnClickAddStickerHandler}>
        {'+'}
      </button>
      {/* //replace to categoryObject */}
      {/* {filteredTasks.map((item, key) => {
        return (
          <ul className="stickersList" key={key}>
            <li className="stickersListItem">
              <StickerComponent stickerObj={item} />
            </li>
          </ul>
        );
      })} */}
      {categoryObject.data.map((item, key) => {
        return (
          <ul className="stickersList" key={key}>
            <li className="stickersListItem">
              <StickerComponent stickerObj={item} />
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default CategoryComponent;
