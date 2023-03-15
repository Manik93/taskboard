import { useAppDispatch, useAppSelector } from "./app/hooks";
import { boardObject } from "./app/types";
import { RootState } from "./app/store";
import BoardComponent from "./features/boardComponent/BoardComponent";
import BoardsPanel from "./features/boardsPanel/BoardsPanel";
import "./App.css";
import { loadState } from "./app/helpers";
import { loadFromStore } from "./features/boardComponent/boardSlice";
import { useEffect } from "react";

const App = () => {
  console.log("AppComponent:Rendered");
  const dispatch = useAppDispatch();
  const localStorageData: RootState = loadState();
  const boardsList: boardObject[] = useAppSelector((state: RootState) => state.boards.value);

  useEffect(() => {
    dispatch(loadFromStore(localStorageData.boards.value));
  }, []);

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
