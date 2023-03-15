import React from "react";
import { XSquare } from "react-feather";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { boardObject, categoryObject } from "../../app/types";
import { addBoardCatogory, deleteBoard } from "../boardComponent/boardSlice";
import { useAppDispatch } from "../../app/hooks";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
import "./boardControlPanelStyle.css";

type boardControlPanelProps = {
  boardObject: boardObject;
};

//Board control panel
const BoardControlPanel = ({ boardObject }: boardControlPanelProps) => {
  console.log("BoardControlPanel:Rendered");
  const store: RootState = useSelector((state: RootState) => state);
  // const taskStateStore: categoryObject[] = store.category.value;
  // console.log(taskStateStore);
  const dispatch = useAppDispatch();
  //dispatch(setBoardCatogories(taskStateStore));

  const onClickPlaceholder = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Export");
  };
  // Board item button click handler
  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteBoard(boardObject.boardID));
  };

  return (
    <>
      <div className="boardControlPanel">
        <div className="boardControlPanelItems">
          <span>{boardObject.name}</span>
          <DropdownComponent boardObject={boardObject} />
        </div>
        <div className="boardContols">
          <button className="boardDelete" onClick={onButtonClick} title="Delete board">
            <XSquare />
          </button>
        </div>
      </div>
      <div className="underline"></div>
    </>
  );
};

export default BoardControlPanel;
