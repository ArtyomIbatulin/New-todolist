import React, { useCallback } from "react";
import { FilterTypeValues } from "./AppWithRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  filter: FilterTypeValues;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterTypeValues, todolistId: string) => void;
  changeTodolistTitle: (newValue: string, todolistId: string) => void;
  addTask: (title: string, id: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTitle: (taskId: string, newValue: string, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist = React.memo((props: PropsType) => {
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const changeTodolistTitle = useCallback((newValue: string) => {
    props.changeTodolistTitle(newValue, props.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const onChangeFilterAllHandler = useCallback(() => {
    props.changeFilter("all", props.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFilterActiveHandler = useCallback(() => {
    props.changeFilter("active", props.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFilterCompletedHandler = useCallback(() => {
    props.changeFilter("completed", props.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let tasksForTodoList = props.tasks;

  if (props.filter === "completed") {
    tasksForTodoList = props.tasks.filter((t) => t.isDone === true);
  }

  if (props.filter === "active") {
    tasksForTodoList = props.tasks.filter((t) => t.isDone === false);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTask} />

      <ul>
        {tasksForTodoList.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.id}
            changeStatus={props.changeStatus}
            changeTitle={props.changeTitle}
            removeTask={props.removeTask}
          />
        ))}
      </ul>
      <div>
        <Stack direction="row" spacing={0.5}>
          <Button
            color="secondary"
            size="small"
            variant={props.filter === "all" ? "contained" : "outlined"}
            onClick={onChangeFilterAllHandler}
          >
            All
          </Button>

          <Button
            color="success"
            size="small"
            variant={props.filter === "active" ? "contained" : "outlined"}
            onClick={onChangeFilterActiveHandler}
          >
            Active
          </Button>
          <Button
            color="error"
            size="small"
            variant={props.filter === "completed" ? "contained" : "outlined"}
            onClick={onChangeFilterCompletedHandler}
          >
            Completed
          </Button>
        </Stack>
      </div>
    </div>
  );
});
