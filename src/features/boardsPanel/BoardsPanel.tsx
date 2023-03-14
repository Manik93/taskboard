import { createBoard, setActiveBoard } from "../boardComponent/boardSlice";
import { PlusSquare } from "react-feather";
import { useAppDispatch } from "../../app/hooks";
import { newBoard } from "../../app/helpers";
import { boardObject } from "../../app/types";
import BoardsPanelItem from "../boardsPanelItem/BoardsPanelItem";
import "./boardsPanelStyle.css";

type appControlProps = {
  boardsList: boardObject[];
};

const AppControlPanel = ({ boardsList }: appControlProps) => {
  console.log("BoardControlPanel:Render");
  const dispatch = useAppDispatch();

  const addBoardHandle = () => {
    const board: boardObject = newBoard();
    dispatch(createBoard(board));
    dispatch(setActiveBoard(board.boardID));
  };

  return (
    <div className="boardControlPanel">
      <div className="header">
        <span>Boards</span>
        <button className="boardAdd" title="Add board" onClick={addBoardHandle}>
          <PlusSquare />
        </button>
      </div>
      <hr />
      <ul className="ControlPanelItems">
        {boardsList.map((item, key) => {
          return <BoardsPanelItem key={key} boardObject={item} />;
        })}
      </ul>
    </div>
  );
};

export default AppControlPanel;
