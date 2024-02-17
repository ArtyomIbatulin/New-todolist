import React from "react";
import { FilterTypeValues } from "./AppWithRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";

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

export const Todolist = (props: PropsType) => {
  console.log("Todolist");
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeTodolistTitle = (newValue: string) => {
    props.changeTodolistTitle(newValue, props.id);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const onChangeFilterAllHandler = () => {
    props.changeFilter("all", props.id);
  };

  const onChangeFilterActiveHandler = () => {
    props.changeFilter("active", props.id);
  };

  const onChangeFilterCompletedHandler = () => {
    props.changeFilter("completed", props.id);
  };

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
        <button onClick={removeTodolist}>x</button>
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
        <button
          className={props.filter === "all" ? "filter-active" : ""}
          onClick={onChangeFilterAllHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "filter-active" : ""}
          onClick={onChangeFilterActiveHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "filter-active" : ""}
          onClick={onChangeFilterCompletedHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
