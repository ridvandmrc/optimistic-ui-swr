import { deleteMutate, deleteOptionMutate } from "@/utils/mutate";
import { request } from "@/utils/request";
import { CircularProgress, Snackbar } from "@mui/material";
import { useState } from "react";
import { AddList } from "./AddList";

export const TodoList = () => {
  const { data, error, isLoading, mutate, isValidating } = request(
    "http://localhost:3000/api/todo"
  );

  const [open, setOpen] = useState(false);

  if (isLoading) return <div>downloading!!!</div>;

  return (
    <>
      <AddList setOpen={setOpen} />
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Action</th>
        </tr>
        {data
          ?.filter((item: any) => item)
          .map((item: any, index: number) => (
            <tr style={{ height: "60px" }}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "darkblue",
                  }}
                  onClick={async () => {
                    try {
                      await mutate(
                        deleteMutate(item.id, data),
                        deleteOptionMutate(data, item.id)
                      );
                    } catch (err) {
                      setOpen(true);
                    }
                  }}
                >
                  {item.isLoading ? <CircularProgress /> : "Remove"}
                </div>
              </td>
            </tr>
          ))}
      </table>
      <Snackbar
        open={open}
        message="Error while removing/adding from list"
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
