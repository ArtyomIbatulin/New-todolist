import { TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import React, { useCallback } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export type FilterTypeValues = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterTypeValues;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const AppWithRedux = () => {
  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );

  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      dispatch(removeTaskAC(id, todolistId));
    },
    [dispatch]
  );
  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskAC(title, todolistId));
    },
    [dispatch]
  );

  const changeStatus = useCallback(
    (taskId: string, isDone: boolean, todolistId: string) => {
      dispatch(changeTaskStatusAC(isDone, taskId, todolistId));
    },
    [dispatch]
  );

  const changeTitle = useCallback(
    (taskId: string, newValue: string, todolistId: string) => {
      dispatch(changeTaskTitleAC(newValue, taskId, todolistId));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (newValue: string, todolistId: string) => {
      dispatch(changeTodolistTitleAC(todolistId, newValue));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (value: FilterTypeValues, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, value));
    },
    [dispatch]
  );
  const removeTodolist = useCallback(
    (todolistId: string) => {
      let action = removeTodolistAC(todolistId);
      dispatch(action);
    },
    [dispatch]
  );
  const addTodolist = useCallback(
    (title: string) => {
      let action = addTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div className="App">
      <Container fixed>
        <Grid container sx={{ paddingBottom: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodoList = allTodolistTasks;

            return (
              <Grid item key={tl.id}>
                <Paper sx={{ padding: "5px" }} elevation={3}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeTodolistTitle={changeTodolistTitle}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    changeTitle={changeTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default AppWithRedux;
