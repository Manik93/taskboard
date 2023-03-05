import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createBoard } from "../boardComponent/boardSlice";
import { newBoard } from "../../app/helpers";
import { RootState } from "../../app/store";
import "./boardControlStyle.css";
import { boardObject } from "../../app/types";

const BoardControlPanel = () => {
  const boards: boardObject[] = useAppSelector((state: RootState) => state.boards.value);

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
      <ul>
        {boards.map((item, key) => {
          return (
            <li key={key}>
              <h2>{item.name}</h2>
              <button>{"..."}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BoardControlPanel;
