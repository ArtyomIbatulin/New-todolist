import { v1 } from "uuid";
import { TodolistType } from "../App";

type ActionType = {
  type: string;
  [key: string]: any;
};

export const todolistsReducer = (
  state: Array<TodolistType>,
  action: ActionType
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
