import { TasksStateType } from "../App";
import { addTaskAC, removeTaskAC, tasksReducer } from "./tasks-reducer";

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