import React, { ChangeEvent, FC, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";
import { TaskType } from "./Todolist";

export type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  removeTask: (id: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTitle: (taskId: string, newValue: string, todolistId: string) => void;
};

export const Task: FC<TaskPropsType> = React.memo((props) => {
  const removeTask = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props]
  );
  const onChangeCheckHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(
        props.task.id,
        e.currentTarget.checked,
        props.todolistId
      );
    },
    [props]
  );
  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      props.changeTitle(props.task.id, newValue, props.todolistId);
    },
    [props]
  );

  return (
    <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <input
        type="checkbox"
        checked={props.task.isDone}
        onChange={onChangeCheckHandler}
      />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <button onClick={removeTask}>x</button>
    </li>
  );
});
