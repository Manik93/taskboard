import React, { useEffect, useRef, useState } from "react";
import { PlusCircle } from "react-feather";
import { newCategory } from "../../app/helpers";
import { useAppDispatch } from "../../app/hooks";
import { boardObject } from "../../app/types";
import { addBoardCatogory } from "../boardComponent/boardSlice";
import "./dropdownStyle.css";

interface dropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  boardObject: boardObject;
}

const DropdownComponent: React.FC<dropdownProps> = ({ onClick, className, boardObject, ...props }) => {
  console.log("DropDownComponent:Rendered");
  const inputName = useRef<HTMLInputElement>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const itemRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (event: any) => {
    if (!itemRef.current?.contains(event.target)) {
      setOpen(false);
    } else {
    }
  };

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
          dispatch(addBoardCatogory(newCategory(categoryName, boardObject.boardID)));

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
        dispatch(addBoardCatogory(newCategory(categoryName, boardObject.boardID)));
        setCategoryName("");
        setOpen(false);
      }
    }
  };

  return (
    <div id="addDiv" className="categoryAdd">
      <button className="newColumn" onClick={handleOpen}>
        <PlusCircle id="buttonPlus" />
        <span>{"Add column"}</span>
      </button>
      {open ? (
        <ul ref={itemRef} className="menu">
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
