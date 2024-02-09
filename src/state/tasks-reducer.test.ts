import { TasksStateType } from "../AppWithRedux";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

test("correct task should be deleted from correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],

    todolistId2: [
      {
        id: "1",
        title: "Car",
        isDone: false,
      },
      {
        id: "2",
        title: "Ship",
        isDone: true,
      },
      {
        id: "3",
        title: "Train",
        isDone: false,
      },
    ],
  };

  const action = removeTaskAC("2", "todolistId2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct task should be added from correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],

    todolistId2: [
      {
        id: "1",
        title: "Car",
        isDone: false,
      },
      {
        id: "2",
        title: "Ship",
        isDone: true,
      },
      {
        id: "3",
        title: "Train",
        isDone: false,
      },
    ],
  };

  const action = addTaskAC("Horse", "todolistId2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("Horse");
  expect(endState["todolistId2"][0].isDone).toBeFalsy();
});

test("correct task should be changed its status from correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],

    todolistId2: [
      {
        id: "1",
        title: "Car",
        isDone: false,
      },
      {
        id: "2",
        title: "Ship",
        isDone: true,
      },
      {
        id: "3",
        title: "Train",
        isDone: false,
      },
    ],
  };

  const action = changeTaskStatusAC(true, "3", "todolistId2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][2].isDone).toBe(true);
  expect(endState["todolistId1"][2].isDone).toBe(false);
});

test("correct task should be changed its title from correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],

    todolistId2: [
      {
        id: "1",
        title: "Car",
        isDone: false,
      },
      {
        id: "2",
        title: "Ship",
        isDone: true,
      },
      {
        id: "3",
        title: "Train",
        isDone: false,
      },
    ],
  };

  const action = changeTaskTitleAC("Super Car", "1", "todolistId2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][0].title).toBe("Super Car");
  expect(endState["todolistId1"][0].title).toBe("HTML&CSS");
});

test("new property with new array should be added when new todolist is added", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],

    todolistId2: [
      {
        id: "1",
        title: "Car",
        isDone: false,
      },
      {
        id: "2",
        title: "Ship",
        isDone: true,
      },
      {
        id: "3",
        title: "Train",
        isDone: false,
      },
    ],
  };

  const action = addTodolistAC("new todolist");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw new Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],

    todolistId2: [
      {
        id: "1",
        title: "Car",
        isDone: false,
      },
      {
        id: "2",
        title: "Ship",
        isDone: true,
      },
      {
        id: "3",
        title: "Train",
        isDone: false,
      },
    ],
  };

  const action = removeTodolistAC("todolistId2");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});
