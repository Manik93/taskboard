import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createBoard, deleteBoard } from "../boardComponent/boardSlice";
import { newBoard } from "../../app/helpers";
import { RootState } from "../../app/store";
import { boardObject } from "../../app/types";
import "./boardControlStyle.css";
import { useState } from "react";
import BoardControlPanelItem from "../boardControlPanelItem/BoardControlPanelItem";

type boardControlProps = {
  boardsList: boardObject[];
};

const BoardControlPanel = ({ boardsList }: boardControlProps) => {
  const dispatch = useAppDispatch();

  const addBoardHandle = () => {
    dispatch(createBoard(newBoard()));
  };

  return (
    <div className="boardControlPanel">
      <div className="header">
        <span>Boards</span>
        <button onClick={addBoardHandle}>{"+"}</button>
      </div>
      <hr />
      <ul className="boardControlPanelItems">
        {boardsList.map((item, key) => {
          return <BoardControlPanelItem key={key} boardObject={item} />;
        })}
      </ul>
    </div>
  );
};

export default BoardControlPanel;
