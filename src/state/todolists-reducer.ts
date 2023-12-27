import { v1 } from "uuid";
import { FilterTypeValues, TodolistType } from "../App";

type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
};
type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterTypeValues;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  state: Array<TodolistType>,
  action: ActionsType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }

    case "ADD-TODOLIST": {
      let todolist: TodolistType = {
        id: v1(),
        filter: "all",
        title: action.title,
      };
      return (state = [...state, todolist]);
    }

    case "CHANGE-TODOLIST-TITLE": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return (state = [...state]);
    }

    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return (state = [...state]);
    }

    default:
      throw new Error("I dont understand this action type");
    // return state;
  }
};

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return {
    type: "REMOVE-TODOLIST",
    id: id,
  };
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: "ADD-TODOLIST",
    title: title,
  };
};

export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: id,
    title: title,
  };
};

export const changeTodolistFilterAC = (
  id: string,
  filter: FilterTypeValues
): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: id,
    filter: filter,
  };
};
