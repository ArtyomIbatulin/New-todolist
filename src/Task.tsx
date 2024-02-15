import React from "react";
import { EditableSpan } from "./EditableSpan";

export const Task = () => {
  const removeTask = () => props.removeTask(t.id, props.id);
  const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(t.id, e.currentTarget.checked, props.id);
  };
  const onChangeTitleHandler = (newValue: string) => {
    props.changeTitle(t.id, newValue, props.id);
  };

  return (
    <div>
      (
      <li key={t.id} className={t.isDone ? "is-done" : ""}>
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={onChangeCheckHandler}
        />
        <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
        <button onClick={removeTask}>x</button>
      </li>
      )
    </div>
  );
};
