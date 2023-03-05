import React from "react";
import { categoryObject, stickerObject } from "../../app/types";
import CategoryComponent from "../categoryComponent/CategoryComponent";
import ControlPanel from "../controlPanel/ControlPanel";
import "./boardStyle.css";

type boardProps = {
  tasksList: stickerObject[];
  categoryList: categoryObject[];
};

const BoardComponent = ({ tasksList, categoryList }: boardProps) => {
  return (
    <div className="taskboard">
      <ControlPanel />
      {categoryList.map((item, key) => {
        console.log("Mapping taskStateStore:", item.data, item.categoryTaskState);
        return <CategoryComponent tasksList={tasksList} taskState={item.categoryTaskState} categoryObject={item} />;
      })}
      {/*
  <CategoryComponent tasksList={stickersStore} taskState="todo" />
  <CategoryComponent tasksList={stickersStore} taskState="inprogress" />
  <CategoryComponent tasksList={stickersStore} taskState="done" />*/}
    </div>
  );
};

export default BoardComponent;
