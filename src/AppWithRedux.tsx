import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterTypeValues = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterTypeValues;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  console.log("App");
  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );

  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId));
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(isDone, taskId, todolistId));
  }

  function changeTitle(taskId: string, newValue: string, todolistId: string) {
    dispatch(changeTaskTitleAC(newValue, taskId, todolistId));
  }

  function changeTodolistTitle(newValue: string, todolistId: string) {
    dispatch(changeTodolistTitleAC(todolistId, newValue));
  }

  function changeFilter(value: FilterTypeValues, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, value));
  }

  function removeTodolist(todolistId: string) {
    let action = removeTodolistAC(todolistId);
    dispatch(action);
  }

  function addTodolist(title: string) {
    let action = addTodolistAC(title);
    dispatch(action);
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />

      {todolists.map((tl) => {
        let allTodolistTasks = tasks[tl.id];
        let tasksForTodoList = allTodolistTasks;

        if (tl.filter === "completed") {
          tasksForTodoList = allTodolistTasks.filter((t) => t.isDone === true);
        }

        if (tl.filter === "active") {
          tasksForTodoList = allTodolistTasks.filter((t) => t.isDone === false);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeTodolistTitle={changeTodolistTitle}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTitle={changeTitle}
          />
        );
      })}
    </div>
  );
}

export default AppWithRedux;
