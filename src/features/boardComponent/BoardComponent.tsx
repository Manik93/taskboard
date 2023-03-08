import { boardObject, categoryObject } from "../../app/types";
import CategoryComponent from "../categoryComponent/CategoryComponent";
import ControlPanel from "../controlPanel/ControlPanel";
import "./boardStyle.css";

type boardProps = {
  boardObject: boardObject;
};

const BoardComponent = ({ boardObject }: boardProps) => {
  const categoryList: categoryObject[] = boardObject.categoryList;

  return (
    <div className="taskboard">
      <ControlPanel boardObject={boardObject} />
      <div className="categoryList">
        {categoryList.map((item, key) => {
          return <CategoryComponent key={key} categoryObject={item} />;
        })}
      </div>
    </div>
  );
};

export default BoardComponent;
