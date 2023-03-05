import { categoryObject, stickerObject } from "./app/types";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import ControlPanel from "./features/controlPanel/ControlPanel";
import { useEffect } from "react";
import CategoryComponent from "./features/categoryComponent/CategoryComponent";

function App() {
  console.log("AppComponent:Rendered");
  const store: RootState = useSelector((state: RootState) => state);
  const stickersStore: stickerObject[] = store.stickers.value;
  const taskStateStore: categoryObject[] = store.category.value;
  console.log("App reRender taskStateStore check", taskStateStore);
  console.log("App reRender stickersStore check", stickersStore);

  return (
    <div className="App">
      <ControlPanel />
      <div className="taskboard">
        {taskStateStore.map((item, key) => {
          console.log("Mapping taskStateStore:", item.data, item.categoryTaskState);
          return (
            <CategoryComponent tasksList={stickersStore} taskState={item.categoryTaskState} categoryObject={item} />
          );
        })}
        {/*
        <CategoryComponent tasksList={stickersStore} taskState="todo" />
        <CategoryComponent tasksList={stickersStore} taskState="inprogress" />
        <CategoryComponent tasksList={stickersStore} taskState="done" />*/}
      </div>
    </div>
  );
}

export default App;
