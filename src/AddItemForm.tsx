import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";

type AddItemFormProps = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormProps) => {
  console.log("AddItemForm");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onTitleChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    },
    []
  );

  const addTask = useCallback(() => {
    if (title !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  }, [props, title]);

  const onKeyUpHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
        setError(null);
      }

      if (e.keyCode === 13) {
        addTask();
      }
    },
    [error, addTask]
  );

  return (
    <div>
      <input
        value={title}
        onChange={onTitleChangeHandler}
        onKeyUp={onKeyUpHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
});
