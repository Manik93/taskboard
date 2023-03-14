import { useAppSelector } from "./app/hooks";
import { boardObject } from "./app/types";
import { RootState } from "./app/store";
import BoardComponent from "./features/boardComponent/BoardComponent";
import BoardsPanel from "./features/boardsPanel/BoardsPanel";
import "./App.css";

const App = () => {
  console.log("AppComponent:Rendered");

  const boardsList: boardObject[] = useAppSelector((state: RootState) => state.boards.value);

  return (
    <div className="App">
      <BoardsPanel boardsList={boardsList} />
      {boardsList.map((item) => {
        return item.isActive ? <BoardComponent boardObject={item} /> : null;
      })}
    </div>
  );
};

export default App;
