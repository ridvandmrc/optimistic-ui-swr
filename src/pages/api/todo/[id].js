import { todoList } from "../todo";

export default function handler(req, res) {
  console.log("request: ", req.method);
  if (req.method === "DELETE") {
    /* console.log("todo list: ", todoList, req.query.id);
    const index = todoList.findIndex((val) => {
      console.log("valu", val.id == req.query.id);
      return val.id == req.query.id;
    });
    console.log("id: ", index);
    if (index > -1) {
      delete todoList[index];
    } */

    res.status(500).json(todoList);
  }
}
