import express from "express";
import Connection from "./database/db.js";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

Connection("rutvik", "rutvik1803");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
