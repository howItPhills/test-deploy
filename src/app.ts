import express from "express";
import { usersRouter } from "./routes/users.routes";
import { testsRouter } from "./routes/tests.routes";

export const app = express();

const jsonBodyMiddleWare = express.json();

app.use(jsonBodyMiddleWare);

app.use("/users", usersRouter);
app.use("/__test__", testsRouter);

app.get("/", (req, res) => {
  res.send("Hello, world");
});
