import express, { Response } from "express";
import { validationResultMiddleware } from "../middlewares/validationMiddleware";
import {
  RequestWithBodyType,
  RequestWithQueryType,
  RequestWithUriAndBodyType,
  RequestWithUriType,
} from "../types";
import { GetUsersInputModel } from "../models/GetUsersInputModel";
import { UserClientModel } from "../models/UserClientModel";
import { UriParamsIdModel } from "../models/UriParamsIdModel";
import { CreateUserInputModel } from "../models/CreateUserInputModel";
import { UpdateUserInputModel } from "../models/UpdateUserInputModel";
import { DbUserModel } from "../db/db.memory";
import { body } from "express-validator";
import { usersService } from "../domain/users.service";

export const createUserClientModel = (dbUser: DbUserModel): UserClientModel => {
  return {
    id: dbUser.id,
    name: dbUser.name,
  };
};

const bodyNameValidation = body("name")
  .trim()
  .isLength({ min: 2, max: 30 })
  .withMessage("name should contain from 2 to 30 symbols");

export const usersRouter = express.Router();

usersRouter.get(
  "/",
  async (
    req: RequestWithQueryType<GetUsersInputModel>,
    res: Response<UserClientModel[]>
  ) => {
    const users = await usersService.getUsers(req.query.name);
    res.status(200).json(users.map(createUserClientModel));
  }
);

usersRouter.get(
  "/:id",
  async (
    req: RequestWithUriType<UriParamsIdModel>,
    res: Response<UserClientModel>
  ) => {
    const foundUser = await usersService.getUserById(req.params.id);
    foundUser
      ? res.status(200).json(createUserClientModel(foundUser))
      : res.sendStatus(404);
  }
);

usersRouter.post(
  "/",
  bodyNameValidation,
  validationResultMiddleware,
  async (
    req: RequestWithBodyType<CreateUserInputModel>,
    res: Response<UserClientModel>
  ) => {
    const newUser = await usersService.createUser(req.body.name);
    res.status(201).json(createUserClientModel(newUser));
  }
);

usersRouter.delete(
  "/:id",
  async (req: RequestWithUriType<UriParamsIdModel>, res) => {
    const isDeleted = await usersService.deleteUser(req.params.id);
    res.sendStatus(isDeleted ? 204 : 404);
  }
);

usersRouter.put(
  "/:id",
  bodyNameValidation,
  validationResultMiddleware,
  async (
    req: RequestWithUriAndBodyType<UriParamsIdModel, UpdateUserInputModel>,
    res: Response<UserClientModel>
  ) => {
    const isUpdated = await usersService.updateUser(
      req.params.id,
      req.body.name
    );
    if (isUpdated) {
      const targetUser = await usersService.getUserById(req.params.id);
      res.status(200).json(createUserClientModel(targetUser!));
    } else {
      res.sendStatus(404);
    }
  }
);
