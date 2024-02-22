import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";

type AddItemFormProps = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormProps) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const addTask = () => {
    if (title !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (e.keyCode === 13) {
      addTask();
    }
  };
  return (
    <div>
      <Stack direction="row">
        <TextField
          label="Type title..."
          variant="outlined"
          value={title}
          onChange={onTitleChangeHandler}
          onKeyUp={onKeyUpHandler}
          error={!!error}
          helperText={error}
        />
        <IconButton onClick={addTask}>
          <AddIcon />
        </IconButton>
      </Stack>
    </div>
  );
});
