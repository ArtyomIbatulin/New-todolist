import { v1 } from "uuid";
import { TasksStateType } from "../App";

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

type ActionsType = RemoveTaskActionType | AddTaskActionType;

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
