import React, { ChangeEvent, FC, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";
import { TaskType } from "./Todolist";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(
      props.task.id,
      e.currentTarget.checked,
      props.todolistId
    );
  };

  const onChangeTitleHandler = useCallback((newValue: string) => {
    props.changeTitle(props.task.id, newValue, props.todolistId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox
        color="secondary"
        checked={props.task.isDone}
        onChange={onChangeCheckHandler}
      />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />

      <IconButton aria-label="delete" onClick={removeTask}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
});
