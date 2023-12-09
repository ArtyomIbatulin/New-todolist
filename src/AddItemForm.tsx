import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormProps = {
  addTask: (title: string, todolistId: string) => void;
  id: string;
};

export const AddItemForm = (props: AddItemFormProps) => {
  const [titleTask, setTitleTask] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(e.currentTarget.value);
  };

  const addTask = () => {
    if (titleTask !== "") {
      props.addTask(titleTask.trim(), props.id);
      setTitleTask("");
    } else {
      setError("Title is required");
    }
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.keyCode === 13) {
      addTask();
    }
  };

  return (
    <div>
      <input
        value={titleTask}
        onChange={onTitleChangeHandler}
        onKeyUp={onKeyUpHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
