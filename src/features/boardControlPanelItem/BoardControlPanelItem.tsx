import React, { useEffect, useRef, useState } from "react";
import { blurActiveBoard, changeBoardName, setActiveBoard } from "../boardComponent/boardSlice";
import { useAppDispatch } from "../../app/hooks";
import { boardObject } from "../../app/types";
import "./controlPanelItemStyle.css";

interface controlPanelItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  boardObject: boardObject;
}

const BoardControlPanelItem = ({ boardObject }: controlPanelItemProps) => {
  console.log("BoardControlPanelItem " + boardObject.name + "[" + boardObject.boardID + "]:Render");
  const [boardObj, setBoardObj] = useState<boardObject>(boardObject);
  const [boardName, setBoardName] = useState<string>(boardObject.name);
  const [editing, setEditing] = useState<boolean>(false);
  const isActive: boolean = boardObject.isActive;
  const dispatch = useAppDispatch();

  // Setting boardObject.name for current board
  useEffect(() => {
    setBoardObj((prevState) => ({
      ...prevState,
      name: boardName,
    }));
  }, [boardName]);

  // Changing board item name edit mode
  const headerDoubleClickHandler = (event: React.MouseEvent<HTMLHeadingElement>) => {
    setEditing(!editing);
  };

  // Board item name change handler
  const onBoardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.currentTarget.value);
  };

  // Board item focus lose handler
  const onBoardNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setBoardName(event.currentTarget.value);
    dispatch(changeBoardName(boardObj));
    setEditing(false);
  };

  // Setting board item active
  const onBoardItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setActiveBoard(boardObject.boardID));
  };

  const blurOnEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <div className={`${isActive ? "active" : ""}ControlPanelItem`} onClick={onBoardItemClick}>
      {editing ? (
        <input
          id={`input_${boardObject.boardID}`}
          className="itemInput"
          type="text"
          maxLength={20}
          value={boardName}
          onChange={onBoardNameChange}
          onKeyDown={blurOnEnterPressed}
          onBlur={onBoardNameBlur}
          autoFocus
        />
      ) : (
        <h2
          id={`header_${boardObject.boardID}`}
          className={`${isActive ? "active" : ""}ItemHeader`}
          onDoubleClick={headerDoubleClickHandler}
        >
          {boardName}
        </h2>
      )}
    </div>
  );
};

export default BoardControlPanelItem;
