import { boardObject, categoryObject } from "../../app/types";
import ColumnComponent from "../columnComponent/ColumnComponent";
import BoardControlPanel from "../boardControlPanel/BoardControlPanel";
import "./boardStyle.css";

type boardProps = {
  boardObject: boardObject;
};

const BoardComponent = ({ boardObject }: boardProps) => {
  const categoryList: categoryObject[] = boardObject.categoryList;

  return (
    <div className="taskboard">
      <BoardControlPanel boardObject={boardObject} />
      <div className="board">
        <div className="categoryList">
          {categoryList.map((item, key) => {
            return <ColumnComponent key={key} categoryObject={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardComponent;
