import { useState } from "react";
import "./headerComponentStyle.css";

type headerComponentProps = {
  title?: string;
};

const HeaderComponent = ({ title }: headerComponentProps) => {
  const [componentTitle, setComponentTitle] = useState<string>(title as string);
  const [editing, setEditing] = useState<boolean>(false);

  const headerDoubleClickHandler = (event: React.MouseEvent<HTMLHeadingElement>) => {
    setEditing(!editing);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComponentTitle(event.currentTarget.value);
  };

  const onTitleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setComponentTitle(event.currentTarget.value);
    setEditing(false);
  };

  const blurOnEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <div className="headerTitle">
      {editing ? (
        <input
          type="text"
          maxLength={24}
          value={componentTitle}
          onChange={onTitleChange}
          onKeyDown={blurOnEnterPressed}
          onBlur={onTitleBlur}
          autoFocus
        />
      ) : (
        <h2 onClick={headerDoubleClickHandler}>{componentTitle}</h2>
      )}
    </div>
  );
};

export default HeaderComponent;
