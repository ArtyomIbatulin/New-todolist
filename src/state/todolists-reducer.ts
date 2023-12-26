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
  }
};
