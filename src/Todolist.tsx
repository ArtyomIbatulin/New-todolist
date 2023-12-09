import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterTypeValues } from "./App";

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
  addTask: (title: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterTypeValues;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist = (props: PropsType) => {
  const [titleTask, setTitleTask] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(e.currentTarget.value);
  };

  const addTask = () => {
    if (titleTask !== "") {
      props.addTask(titleTask.trim(), props.id);
      setTitleTask("");
    } else {
      setError("Title is required");
    }
  };

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.keyCode === 13) {
      addTask();
    }
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
      <div>
        <input
          value={titleTask}
          onChange={onTitleChangeHandler}
          onKeyUp={onKeyUpHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
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
