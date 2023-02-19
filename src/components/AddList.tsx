import { addMutate, addOptionMutate } from "@/utils/mutate";
import { request } from "@/utils/request";
import { Box, Button, TextField } from "@mui/material";
import { FC, useRef } from "react";

export const AddList: FC<{ setOpen: (arg: boolean) => void }> = ({
  setOpen,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const { data, error, isLoading, isValidating, mutate } = request(
    "http://localhost:3000/api/todo"
  );

  return (
    <Box alignItems="center" justifyContent="center" margin={4}>
      <TextField
        sx={{ width: "30rem" }}
        size="small"
        label="Add Name"
        inputRef={nameRef}
        autoFocus
      />
      <TextField
        sx={{ width: "30rem", marginLeft: "1rem" }}
        size="small"
        label="Surname"
        inputRef={surnameRef}
      />
      <Button
        sx={{ marginLeft: "1rem", marginTop: "auto", marginBottom: "auto" }}
        variant="contained"
        size="small"
        onClick={async () => {
          const newTodo = {
            name: nameRef.current?.value,
            surname: surnameRef.current?.value,
            isLoading: true,
          };

          try {
            await mutate(
              addMutate({ ...newTodo, isLoading: false }, data),
              addOptionMutate(data, newTodo)
            );
          } catch (err) {
            setOpen(true);
          }
        }}
      >
        Add
      </Button>
    </Box>
  );
};
