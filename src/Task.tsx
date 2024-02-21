import React, { ChangeEvent, FC, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";
import { TaskType } from "./Todolist";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

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
        defaultChecked
        checked={props.task.isDone}
        onChange={onChangeCheckHandler}
      />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={removeTask}
      >
        Delete
      </Button>
    </li>
  );
});
