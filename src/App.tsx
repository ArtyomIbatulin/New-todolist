import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterTypeValues = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
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
  ]);
  let [filter, setFilter] = useState<FilterTypeValues>("all");

  function removeTask(id: string) {
    tasks = tasks.filter((t) => t.id !== id);
    setTasks(tasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    let newTasks = [...tasks];
    setTasks(newTasks);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }

  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  function changeFilter(value: FilterTypeValues) {
    setFilter(value);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
