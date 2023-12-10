import React, { ChangeEvent } from "react";
import { FilterTypeValues } from "./App";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterTypeValues, todolistId: string) => void;
  addTask: (title: string, id: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterTypeValues;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist = (props: PropsType) => {
  const addTask = (title: string) => {
    props.addTask(title, props.id);
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

  return (
    <div>
      <h3>
        {props.title} <button onClick={removeTodolist}>x</button>
      </h3>

      <AddItemForm addItem={addTask} />

      <ul>
        {props.tasks.map((t) => {
          const removeTask = () => props.removeTask(t.id, props.id);
          const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeCheckHandler}
              />
              <span>{t.title}</span>
              <button onClick={removeTask}>x</button>
            </li>
          );
        })}
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
