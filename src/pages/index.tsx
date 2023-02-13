import { request } from "@/utils/request";
import { useEffect } from "react";

export default function Home() {
  const { data, error, isLoading, mutate } = request(
    "http://localhost:3000/api/todo"
  );

  if (isLoading) return <div>downloading!!!</div>;
  return (
    <table>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Action</th>
      </tr>
      {data
        .filter((item: any) => item)
        .map((item: any) => (
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.surname}</td>
            <td>
              <div
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "darkblue",
                }}
                onClick={() => {
                  fetch(`http://localhost:3000/api/todo/${item.id}`, {
                    method: "delete",
                  }).then((res) =>
                    mutate(
                      [
                        ...data.filter(
                          (deletedItem: any) => deletedItem.id !== item.id
                        ),
                      ],
                      {
                        revalidate: false,
                        rollbackOnError: (status) => {
                          console.log("error:", status);
                          return true;
                        },
                      }
                    )
                  );
                }}
              >
                Remove
              </div>
            </td>
          </tr>
        ))}
    </table>
  );
}
