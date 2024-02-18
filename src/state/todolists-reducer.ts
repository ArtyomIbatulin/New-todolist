import { v1 } from "uuid";
import { FilterTypeValues, TodolistType } from "../AppWithRedux";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
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

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistType> = [
  // { id: todolistId1, title: "What to learn", filter: "all" },
  // { id: todolistId2, title: "What to byu", filter: "all" },
];

export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionsType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }

    case "ADD-TODOLIST": {
      let todolist: TodolistType = {
        id: action.todolistId,
        filter: "all",
        title: action.title,
      };
      return (state = [todolist, ...state]);
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
      return state;
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
    title,
    todolistId: v1(),
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
