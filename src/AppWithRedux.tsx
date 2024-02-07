import React, { useReducer } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { useDispatch } from "react-redux";

export type FilterTypeValues = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterTypeValues;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const dispatch = useDispatch();

  const [todolists] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to byu", filter: "all" },
  ]);

  const [tasksObj] = useReducer(tasksReducer, {
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: true,
      },
      {
        id: v1(),
        title: "React",
        isDone: false,
      },
      {
        id: v1(),
        title: "Redux",
        isDone: false,
      },
    ],

    [todolistId2]: [
      {
        id: v1(),
        title: "Car",
        isDone: true,
      },
      {
        id: v1(),
        title: "Ship",
        isDone: true,
      },
      {
        id: v1(),
        title: "Plane",
        isDone: false,
      },
      {
        id: v1(),
        title: "Train",
        isDone: false,
      },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId));
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(isDone, taskId, todolistId));
  }

  function changeTitle(taskId: string, newValue: string, todolistId: string) {
    dispatch(changeTaskTitleAC(newValue, taskId, todolistId));
  }

  function changeTodolistTitle(newValue: string, todolistId: string) {
    dispatch(changeTodolistTitleAC(todolistId, newValue));
  }

  function changeFilter(value: FilterTypeValues, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, value));
  }

  function removeTodolist(todolistId: string) {
    let action = removeTodolistAC(todolistId);
    dispatch(action);
  }

  function addTodolist(title: string) {
    let action = addTodolistAC(title);
    dispatch(action);
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />

      {todolists.map((tl) => {
        let allTodolistTasks = tasksObj[tl.id];
        let tasksForTodoList = allTodolistTasks;

        if (tl.filter === "completed") {
          tasksForTodoList = allTodolistTasks.filter((t) => t.isDone === true);
        }

        if (tl.filter === "active") {
          tasksForTodoList = allTodolistTasks.filter((t) => t.isDone === false);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeTodolistTitle={changeTodolistTitle}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTitle={changeTitle}
          />
        );
      })}
    </div>
  );
}

export default AppWithRedux;
