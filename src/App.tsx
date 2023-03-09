import { useAppSelector } from "./app/hooks";
import { boardObject } from "./app/types";
import { RootState } from "./app/store";
import BoardComponent from "./features/boardComponent/BoardComponent";
import BoardControlPanel from "./features/boardControlPanel/BoardControlPanel";
import "./App.css";
import { loadState } from "./app/helpers";
import { BoardsState } from "./features/boardComponent/boardSlice";

const App = () => {
  console.log("AppComponent:Rendered");

  const boardsList: boardObject[] = useAppSelector((state: RootState) => state.boards.value);

  return (
    <div className="App">
      <BoardControlPanel boardsList={boardsList} />
      {boardsList.map((item) => {
        return item.isActive ? <BoardComponent boardObject={item} /> : null;
      })}
    </div>
  );
};

export default App;
