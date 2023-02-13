export const todoList = [
  { id: 0, name: "Ridvan ", surname: "demirci" },
  { id: 1, name: "Furkan ", surname: "demirci" },
  { id: 2, name: "Asiye ", surname: "demirci" },
];

export default function handler(req, res) {
  console.log("request: ", req.method);
  if (req.method === "GET") {
    res.json(todoList);
  } else if (req.method === "POST") {
    todoList.push(req.body);
    res.status(200).json(req.body);
  }
}
