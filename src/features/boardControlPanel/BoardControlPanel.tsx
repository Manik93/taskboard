import { createBoard } from "../boardComponent/boardSlice";
import { useAppDispatch } from "../../app/hooks";
import { newBoard } from "../../app/helpers";
import { boardObject } from "../../app/types";
import BoardControlPanelItem from "../boardControlPanelItem/BoardControlPanelItem";
import "./boardControlStyle.css";

type boardControlProps = {
  boardsList: boardObject[];
};

const BoardControlPanel = ({ boardsList }: boardControlProps) => {
  console.log("BoardControlPanel:Render");
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
      <ul className="ControlPanelItems">
        {boardsList.map((item, key) => {
          return <BoardControlPanelItem key={key} boardObject={item} />;
        })}
      </ul>
    </div>
  );
};

export default BoardControlPanel;
