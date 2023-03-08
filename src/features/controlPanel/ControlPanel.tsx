import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { boardObject, categoryObject } from "../../app/types";
import { addBoardCatogory } from "../boardComponent/boardSlice";
import { useAppDispatch } from "../../app/hooks";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
import "./controlPanelStyle.css";

type controlPanelProps = {
  boardObject: boardObject;
};

//Board control panel
const ControlPanel = ({ boardObject }: controlPanelProps) => {
  console.log("ControlPanelComponent:Rendered");
  const store: RootState = useSelector((state: RootState) => state);
  // const taskStateStore: categoryObject[] = store.category.value;
  // console.log(taskStateStore);
  const dispatch = useAppDispatch();
  //dispatch(setBoardCatogories(taskStateStore));

  const onClickPlaceholder = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Export");
  };

  return (
    <>
      <div className="controlPanel">
        <div className="panelElements">
          <DropdownComponent boardObject={boardObject} />
          <button className="newCategory" onClick={onClickPlaceholder}>
            {"=> Export"}
          </button>
        </div>
      </div>
      <div className="underline"></div>
    </>
  );
};

export default ControlPanel;
