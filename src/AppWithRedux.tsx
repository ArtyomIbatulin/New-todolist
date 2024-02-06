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

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to byu", filter: "all" },
  ]);

  const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
    dispatchToTasksReducer(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId));
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(isDone, taskId, todolistId));
  }

  function changeTitle(taskId: string, newValue: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(newValue, taskId, todolistId));
  }

  function changeTodolistTitle(newValue: string, todolistId: string) {
    dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newValue));
  }

  function changeFilter(value: FilterTypeValues, todolistId: string) {
    dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value));
  }

  function removeTodolist(todolistId: string) {
    let action = removeTodolistAC(todolistId);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  function addTodolist(title: string) {
    let action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
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
