import { categoryObject, stickerObject } from "./app/types";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import BoardComponent from "./features/boardComponent/BoardComponent";
import BoardControlPanel from "./features/boardControlPanel/BoardControlPanel";

function App() {
  console.log("AppComponent:Rendered");
  const store: RootState = useSelector((state: RootState) => state);
  const stickersStore: stickerObject[] = store.stickers.value;
  const taskStateStore: categoryObject[] = store.category.value;
  console.log("App reRender taskStateStore check", taskStateStore);
  console.log("App reRender stickersStore check", stickersStore);

  return (
    <div className="App">
      <BoardControlPanel />
      <BoardComponent tasksList={stickersStore} categoryList={taskStateStore} />
    </div>
  );
}

export default App;
