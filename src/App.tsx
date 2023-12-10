import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type FilterTypeValues = "all" | "completed" | "active";

type TodolistType = {
  id: string;
  title: string;
  filter: FilterTypeValues;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to byu", filter: "all" },
  ]);

  const [tasksObj, setTasks] = useState({
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
    let tasks = tasksObj[todolistId].filter((t) => t.id !== id);
    tasksObj[todolistId] = tasks;

    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    tasksObj[todolistId] = [newTask, ...tasks];

    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
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

  return (
    <div className="App">
      <AddItemForm
        addItem={(title: string) => {
          console.log(title);
        }}
      />

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
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
