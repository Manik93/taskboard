import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { stickerObject } from "../../app/types";
import { deleteStickerFromCategory } from "../categoryComponent/categorySlice";
import { deleteSticker, setStickerContent, setStickerHeader } from "./stickerSlice";
import "./stickerStyle.css";

//StickerComponent props type
type stickerProps = {
  stickerObj: stickerObject;
};

const StickerComponent = (props: stickerProps) => {
  console.log(
    " -StickerComponent " + props.stickerObj.stickerID + " " + props.stickerObj.stickerTaskState + ":Rendered"
  );
  //dispatch for redux actions
  const dispatch = useAppDispatch();

  //getting object from store throught props
  const [stickerObject, setStickerObject] = useState<stickerObject>(props.stickerObj);

  //state for header
  const [header, setHeader] = useState<string>(stickerObject.data.header as string);

  //state for content
  const [content, setContent] = useState<string>(stickerObject.data.content as string);

  //renew sticker object data
  useEffect(() => {
    setStickerObject((prevState) => ({
      ...prevState,
      data: { header: header, content: content },
    }));
  }, [header, content]);

  //hadling changes in input elements
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (event.target.id) {
      case "header":
        setHeader(event.target.value);
        break;
      case "content":
        setContent(event.target.value);
        break;
      default:
        break;
    }
  };

  //losing focus action
  const handleLoseFocus = (event: React.FocusEvent) => {
    switch (event.target.id) {
      case "header":
        console.log("header lose focus");
        dispatch(setStickerHeader(stickerObject));
        break;
      case "content":
        console.log("content lose focus");
        dispatch(setStickerContent(stickerObject));
        break;
      default:
        break;
    }
  };

  //handling submit in input elements
  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.currentTarget.id === "header") {
        dispatch(setStickerHeader(stickerObject));
        event.currentTarget.blur();
      }
    }
  };

  const handleDeleteSticker = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteSticker(props.stickerObj.stickerID));
    dispatch(deleteStickerFromCategory(props.stickerObj));
  };

  return (
    <div className="sticker">
      <div className="stickerHeader">
        <input
          id="header"
          type="text"
          maxLength={50}
          className="stickerHeaderInput"
          placeholder="Sticker header"
          value={header}
          onChange={handleOnChange}
          onKeyDown={handleSubmit}
          onBlur={handleLoseFocus}
        />
        <button onClick={handleDeleteSticker}>{"x"}</button>
      </div>
      <textarea
        id="content"
        cols={50}
        rows={4}
        maxLength={256}
        className="stickerContentArea"
        value={content}
        placeholder="Type text here"
        onChange={handleOnChange}
        onKeyDown={handleSubmit}
        onBlur={handleLoseFocus}
      />
    </div>
  );
};

export default StickerComponent;
