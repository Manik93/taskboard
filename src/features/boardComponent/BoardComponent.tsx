import { useEffect, useRef, useState } from "react";
import { boardObject, categoryObject } from "../../app/types";
import { useAppDispatch } from "../../app/hooks";
import { changeBoardColumnList } from "./boardSlice";
import ColumnComponent from "../columnComponent/ColumnComponent";
import BoardControlPanel from "../boardControlPanel/BoardControlPanel";
import "./boardStyle.css";

type boardProps = {
  boardObject: boardObject;
};

const BoardComponent = ({ boardObject }: boardProps) => {
  console.log("BoardComponent:Render");
  const categoryList: categoryObject[] = boardObject.categoryList;
  const [columns, setColumns] = useState<categoryObject[]>(categoryList);
  const dragItem = useRef<categoryObject | null>(null);
  const dragItemIndex = useRef<number | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setColumns(boardObject.categoryList);
  }, [categoryList]);

  // Start dragging handler
  const onDragStartHandle = (event: React.DragEvent<HTMLDivElement>, item: categoryObject, index: number) => {
    dragItem.current = item;
    dragItemIndex.current = index;
  };

  // DragOver item handler
  const onDragOverHandle = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    if (dragItem.current && dragItemIndex.current !== null) {
      const draggedOverItem = columns[index];
      const draggedOverIndex = columns.indexOf(draggedOverItem);
      if (draggedOverIndex === dragItemIndex.current) {
        return;
      }
      const newColumnList = [...columns];
      newColumnList.splice(dragItemIndex.current, 1);
      newColumnList.splice(draggedOverIndex, 0, dragItem.current);
      setColumns(newColumnList);
      dragItemIndex.current = draggedOverIndex;
    }
  };

  // Item drop handler
  const onDragEndHandle = () => {
    dispatch(changeBoardColumnList(columns));
    dragItem.current = null;
    dragItemIndex.current = null;
  };

  return (
    <div className="boardComponent">
      <BoardControlPanel boardObject={boardObject} />
      <div className="boardContent">
        <div className="columnList">
          {categoryList.map((item, index) => {
            return (
              <div
                className="columnComponentWrapper"
                draggable
                onDragStart={(event) => onDragStartHandle(event, item, index)}
                onDragOver={(event) => onDragOverHandle(event, index)}
                onDragEnd={onDragEndHandle}
                key={item.categoryID}
              >
                <ColumnComponent key={index} categoryObject={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardComponent;
