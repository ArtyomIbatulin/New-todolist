import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterTypeValues } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterTypeValues) => void;
  addTask: (title: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterTypeValues;
};

export const Todolist = (props: PropsType) => {
  const [titleTask, setTitleTask] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(e.currentTarget.value);
  };

  const addTask = () => {
    if (titleTask !== "") {
      props.addTask(titleTask.trim());
      setTitleTask("");
    } else {
      setError("Title is required");
    }
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.keyCode === 13) {
      addTask();
    }
  };

  const onChangeFilterAllHandler = () => {
    props.changeFilter("all");
  };

  const onChangeFilterActiveHandler = () => {
    props.changeFilter("active");
  };

  const onChangeFilterCompletedHandler = () => {
    props.changeFilter("completed");
  };

  return (
    <div>
      <h3>{props.title}</h3>
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
          const removeTask = () => props.removeTask(t.id);
          const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked);
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
