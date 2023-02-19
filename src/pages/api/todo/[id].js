import { todoList } from "../todo";

export default function handler(req, res) {
  if (Math.random() <= 0.5) {
    setTimeout(() => {
      res.status(500).send({ success: false });
    }, 1000);
  } else {
    if (req.method === "DELETE") {
      const index = todoList.findIndex((val) => {
        return val.id == req.query.id;
      });
      if (index > -1) {
        delete todoList[index];
      }

      setTimeout(() => {
        res.status(200).json(todoList);
      }, 1000);
    }
  }
}
