import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { useAppDispatch } from "../../app/hooks";
import { stickerObject } from "../../app/types";
import { removeBoardCatogorySticker } from "../boardComponent/boardSlice";
import { setStickerHeader, setStickerContent } from "../boardComponent/boardSlice";
import "./stickerStyle.css";

//StickerComponent props type
type stickerProps = {
  stickerObj: stickerObject;
};

const StickerComponent = (props: stickerProps) => {
  console.log(" -StickerComponent " + props.stickerObj.stickerData.header + ":Rendered");

  const [stickerObject, setStickerObject] = useState<stickerObject>(props.stickerObj);
  const [header, setHeader] = useState<string>(stickerObject.stickerData.header as string);
  const [content, setContent] = useState<string>(stickerObject.stickerData.content as string);
  const dispatch = useAppDispatch();

  // Renew sticker object data
  useEffect(() => {
    setStickerObject((prevState) => ({
      ...prevState,
      stickerData: { header: header, content: content },
    }));
  }, [header, content]);

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

  const handleLoseFocus = (event: React.FocusEvent) => {
    switch (event.target.id) {
      case "header":
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

  const submitOnEnterPressed = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.currentTarget.id === "header") {
        dispatch(setStickerHeader(stickerObject));
        event.currentTarget.blur();
      }
    }
  };

  const handleDeleteSticker = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeBoardCatogorySticker(stickerObject));
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
          onKeyDown={submitOnEnterPressed}
          onBlur={handleLoseFocus}
        />
        <button title="Delete sticker" onClick={handleDeleteSticker}>
          <X />
        </button>
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
        onBlur={handleLoseFocus}
      />
    </div>
  );
};

export default StickerComponent;
