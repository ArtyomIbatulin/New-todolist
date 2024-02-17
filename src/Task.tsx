import React, { ChangeEvent, FC } from "react";
import { EditableSpan } from "./EditableSpan";
import { TaskType } from "./Todolist";

export type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  removeTask: (id: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTitle: (taskId: string, newValue: string, todolistId: string) => void;
};

export const Task: FC<TaskPropsType> = (props) => {
  const removeTask = () => props.removeTask(props.task.id, props.todolistId);

  const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(
      props.task.id,
      e.currentTarget.checked,
      props.todolistId
    );
  };
  const onChangeTitleHandler = (newValue: string) => {
    props.changeTitle(props.task.id, newValue, props.todolistId);
  };

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
};
