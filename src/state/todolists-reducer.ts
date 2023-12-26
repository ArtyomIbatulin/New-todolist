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

    default:
      throw new Error("I dont understand this action type");
  }
};
