import React, { ChangeEvent, useCallback, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (title: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("EditableSpan");
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const onChangeTitleHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    },
    []
  );

  const activateViewMode = useCallback(() => {
    setEditMode(false);
    props.onChange(title);
  }, [props, title]);

  const activateEditMode = useCallback(() => {
    setEditMode(true);
    setTitle(props.title);
  }, [props.title]);

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
});
