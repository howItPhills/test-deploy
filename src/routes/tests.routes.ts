import express from "express";
import { usersRepository } from "../repositories/users.repository";

export const testsRouter = express.Router();

testsRouter.delete("/users_data", async (req, res) => {
  await usersRepository.tests();
  res.sendStatus(200);
});
