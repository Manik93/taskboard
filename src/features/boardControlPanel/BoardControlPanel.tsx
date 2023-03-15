import React from "react";
import { XSquare } from "react-feather";
import { boardObject } from "../../app/types";
import { deleteBoard } from "../boardComponent/boardSlice";
import { useAppDispatch } from "../../app/hooks";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
import "./boardControlPanelStyle.css";

type boardControlPanelProps = {
  boardObject: boardObject;
};

//Board control panel
const BoardControlPanel = ({ boardObject }: boardControlPanelProps) => {
  console.log("BoardControlPanel:Rendered");
  const dispatch = useAppDispatch();

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
