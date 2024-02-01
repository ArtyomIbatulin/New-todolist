import React, { useReducer } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { todolistsReducer } from "./state/todolists-reducer";
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

function AppWithReducers() {
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
    // let tasks = tasksObj[todolistId].filter((t) => t.id !== id);
    // tasksObj[todolistId] = tasks;
    // setTasks({ ...tasksObj });
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId));
    // let newTask = { id: v1(), title: title, isDone: false };
    // let tasks = tasksObj[todolistId];
    // tasksObj[todolistId] = [newTask, ...tasks];
    // setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(isDone, taskId, todolistId));
    // let tasks = tasksObj[todolistId];
    // let task = tasks.find((t) => t.id === taskId);
    // if (task) {
    //   task.isDone = isDone;
    //   setTasks({ ...tasksObj });
    // }
  }

  function changeTitle(taskId: string, newValue: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(newValue, taskId, todolistId));
    // let tasks = tasksObj[todolistId];
    // let task = tasks.find((t) => t.id === taskId);
    // if (task) {
    //   task.title = newValue;
    //   setTasks({ ...tasksObj });
    // }
  }

  function changeTodolistTitle(newValue: string, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newValue;
      setTodolists([...todolists]);
    }
  }

  function changeFilter(value: FilterTypeValues, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolist);

    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title,
    };

    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: [],
    });
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />

      {todolists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];

        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }

        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
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

export default AppWithReducers;
