import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistActionType } from "./todolists-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  id: string;
  todolistId: string;
};

type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistId: string;
};

type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  isDone: boolean;
  id: string;
  todolistId: string;
};

type changeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  title: string;
  id: string;
  todolistId: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | changeTaskTitleActionType
  | AddTodolistActionType;

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      let stateCopy = { ...state };

      let tasks = stateCopy[action.todolistId].filter(
        (t) => t.id !== action.id
      );
      stateCopy[action.todolistId] = tasks;

      return stateCopy;
    }

    case "ADD-TASK": {
      const stateCopy = { ...state };

      let newTask = { id: v1(), title: action.title, isDone: false };
      let tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = [newTask, ...tasks];

      return stateCopy;
    }

    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };

      let tasks = stateCopy[action.todolistId];
      let task = tasks.find((t) => t.id === action.id);
      if (task) {
        task.isDone = action.isDone;
      }

      return stateCopy;
    }

    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };

      let tasks = stateCopy[action.todolistId];
      let task = tasks.find((t) => t.id === action.id);
      if (task) {
        task.title = action.title;
      }

      return stateCopy;
    }

    case "ADD-TODOLIST": {
      const stateCopy = { ...state };

      stateCopy[action.todolistId] = [];

      return stateCopy;
    }

    default:
      throw new Error("I dont understand this action type");
    // return state;
  }
};

export const removeTaskAC = (
  id: string,
  todolistId: string
): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    id,
    todolistId,
  };
};

export const addTaskAC = (
  title: string,
  todolistId: string
): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    title,
    todolistId,
  };
};

export const changeTaskStatusAC = (
  isDone: boolean,
  id: string,
  todolistId: string
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    isDone,
    id,
    todolistId,
  };
};

export const changeTaskTitleAC = (
  title: string,
  id: string,
  todolistId: string
): changeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    title,
    id,
    todolistId,
  };
};
