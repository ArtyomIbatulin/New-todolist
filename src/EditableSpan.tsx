import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (title: string) => void;
};

export const EditableSpan = (props: EditableSpanPropsType) => {
  console.log("EditableSpan");
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  return editMode ? (
    <input
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
