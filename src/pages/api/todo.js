export const todoList = [
  { id: 0, name: "Ridvan ", surname: "demirci" },
  { id: 1, name: "Furkan ", surname: "demirci" },
  { id: 2, name: "Asiye ", surname: "demirci" },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    setTimeout(() => res.json(todoList), 1000);
  } else if (req.method === "POST") {
    if (Math.random() <= 0.5) {
      setTimeout(() => {
        res.status(500).send({ success: false });
      }, 1000);
    } else {
      todoList.push(JSON.parse(req.body));
      setTimeout(() => res.status(200).json(todoList), 1000);
    }
  }
}
