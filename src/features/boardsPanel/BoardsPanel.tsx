import { createBoard, setActiveBoard } from "../boardComponent/boardSlice";
import { PlusSquare } from "react-feather";
import { useAppDispatch } from "../../app/hooks";
import { newBoard } from "../../app/helpers";
import { boardObject } from "../../app/types";
import BoardsPanelItem from "../boardsPanelItem/BoardsPanelItem";
import "./boardsPanelStyle.css";

type boardsPanelProps = {
  boardsList: boardObject[];
};

const BoardsPanel = ({ boardsList }: boardsPanelProps) => {
  console.log("BoardsPanel:Render");
  const dispatch = useAppDispatch();

  const addBoardHandle = () => {
    const board: boardObject = newBoard();
    dispatch(createBoard(board));
    // If boardList is empty - focus first added item
    if (boardsList.length === 0) {
      dispatch(setActiveBoard(board.boardID));
    }
  };

  return (
    <div className="boardsPanel">
      <div className="boardsPanelHeader">
        <span>Boards</span>
        <button className="boardAdd" title="Add new board" onClick={addBoardHandle}>
          <PlusSquare />
        </button>
      </div>
      <hr />
      <ul className="boardsPanelItems">
        {boardsList.map((item, key) => {
          return <BoardsPanelItem key={key} boardObject={item} />;
        })}
      </ul>
    </div>
  );
};

export default BoardsPanel;
