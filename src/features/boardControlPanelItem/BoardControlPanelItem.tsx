import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { boardObject } from "../../app/types";
import { deleteBoard, setActiveBoard } from "../boardComponent/boardSlice";
import "./controlPanelItemStyle.css";

interface controlPanelItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  boardObject: boardObject;
}

const BoardControlPanelItem = ({ boardObject }: controlPanelItemProps) => {
  const [boardName, setBoardName] = useState<string>(boardObject.name);
  /*  const [boardID, setboardID] = useState<number>(boardObject.boardID); */
  const dispatch = useAppDispatch();

  const onBoardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.currentTarget.value);
  };

  const onBoardNameClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const onBoardNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    //setBoardName(event.currentTarget.value);
  };

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteBoard(boardObject.boardID));
  };

  const onBoardItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setActiveBoard(boardObject.boardID));
  };

  return (
    <div className="boardControlPanelItem" onClick={onBoardItemClick}>
      <input
        className="itemInput"
        type="text"
        value={boardName}
        onChange={onBoardNameChange}
        onClick={onBoardNameClick}
        onBlur={onBoardNameBlur}
      />
      <button className="itemButton" onClick={onButtonClick}>
        {"..."}
      </button>
    </div>
  );
};

export default BoardControlPanelItem;
function dispatch(arg0: { payload: string; type: "boards/deleteBoard" }) {
  throw new Error("Function not implemented.");
}
