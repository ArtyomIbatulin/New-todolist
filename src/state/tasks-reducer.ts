import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  // todolistId1,
  // todolistId2,
} from "./todolists-reducer";

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
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {
  // [todolistId1]: [
  //   {
  //     id: v1(),
  //     title: "HTML&CSS",
  //     isDone: true,
  //   },
  //   {
  //     id: v1(),
  //     title: "JS",
  //     isDone: true,
  //   },
  //   {
  //     id: v1(),
  //     title: "React",
  //     isDone: false,
  //   },
  //   {
  //     id: v1(),
  //     title: "Redux",
  //     isDone: false,
  //   },
  // ],
  // [todolistId2]: [
  //   {
  //     id: v1(),
  //     title: "Car",
  //     isDone: true,
  //   },
  //   {
  //     id: v1(),
  //     title: "Ship",
  //     isDone: true,
  //   },
  //   {
  //     id: v1(),
  //     title: "Plane",
  //     isDone: false,
  //   },
  //   {
  //     id: v1(),
  //     title: "Train",
  //     isDone: false,
  //   },
  // ]
};

export const tasksReducer = (
  state: TasksStateType = initialState,
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
      stateCopy[action.todolistId] = tasks.map((t) =>
        t.id === action.id ? { ...t, isDone: action.isDone } : t
      );

      return stateCopy;
    }

    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };

      let tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.map((t) =>
        t.id === action.id ? { ...t, title: action.title } : t
      );

      return stateCopy;
    }

    case "ADD-TODOLIST": {
      const stateCopy = { ...state };

      stateCopy[action.todolistId] = [];

      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };

      delete stateCopy[action.id];

      return stateCopy;
    }

    default:
      return state;
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
