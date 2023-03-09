import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { newCategory } from "../../app/helpers";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { boardObject, categoryObject, stickerObject } from "../../app/types";
import { addBoardCatogory } from "../boardComponent/boardSlice";
import "./dropdownStyle.css";

interface dropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  boardObject: boardObject;
}

const DropdownComponent: React.FC<dropdownProps> = ({ onClick, className, boardObject, ...props }) => {
  console.log("DropDownComponent:Rendered");
  // const stickersStore: stickerObject[] = useSelector((state: RootState) => state.stickers.value);
  // const categoryStore: categoryObject[] = useSelector((state: RootState) => state.category.value);
  const inputName = useRef<HTMLInputElement>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(!open);
  };

  const onChangeCategoryNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const onBlurCategoryNameHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    //setOpen(!open);
  };

  //try to merge or simplify
  const checkExistName = (newCategoryName: string) => {
    for (let i = 0; i < boardObject.categoryList.length; i++) {
      if (boardObject.categoryList[i].categoryName === newCategoryName) {
        //exist
        return true;
      }
      //not exist
    }
    return false;
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("checkExistName", checkExistName(categoryName));
    if (event.key === "Enter") {
      if (categoryName.length < 1) {
        if (inputName.current) {
          inputName.current.placeholder = "Empty";
        }
      } else {
        if (checkExistName(categoryName)) {
          if (inputName.current) {
            setCategoryName("");
            inputName.current.placeholder = "Exist";
          }
        } else {
          //works!
          dispatch(addBoardCatogory(newCategory(/* stickersStore, */ categoryName, boardObject.boardID)));
          //dispatch(addCategory(newCategory(stickersStore, categoryName, boardObject.boardID)));

          setCategoryName("");
          setOpen(false);
        }
      }
    }
  };

  const handleCreateCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    //add check for same name
    if (categoryName.length < 1) {
      if (inputName.current) {
        inputName.current.placeholder = "Empty";
      }
    } else {
      if (checkExistName(categoryName)) {
        if (inputName.current) {
          setCategoryName("");
          inputName.current.placeholder = "Exist";
        }
      } else {
        //works!
        dispatch(addBoardCatogory(newCategory(/* stickersStore, */ categoryName, boardObject.boardID)));
        //dispatch(addCategory(newCategory(stickersStore, categoryName, boardObject.boardID)));
        setCategoryName("");
        setOpen(false);
      }
    }
  };

  return (
    <div className={className}>
      <button className="newCategory" onClick={handleOpen}>
        {"+ New category"}
      </button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <input
              type="text"
              ref={inputName}
              placeholder="Category name"
              value={categoryName}
              minLength={1}
              maxLength={20}
              onChange={onChangeCategoryNameHandler}
              onBlur={onBlurCategoryNameHandler}
              onKeyDown={handleSubmit}
            />
          </li>
          <li className="categoryButton">
            <button onClick={handleCreateCategory}>Create</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default DropdownComponent;
