import { usersRepository } from "./../repositories/users.repository";
import { DbUserModel } from "../db/db.memory";

export const usersService = {
  async getUsers(name: string | undefined) {
    return await usersRepository.getUsers(name);
  },
  async getUserById(id: string) {
    return await usersRepository.getUserById(id);
  },
  async createUser(name: string) {
    const newUser: DbUserModel = {
      id: +new Date(),
      name,
      age: Math.floor(Math.random() * 40),
    };

    const createdUser = await usersRepository.createUser(newUser);

    return createdUser;
  },
  async deleteUser(id: string) {
    const isDeleted = await usersRepository.deleteUser(id);
    return isDeleted;
  },
  async updateUser(id: string, newName: string) {
    const isUpdated = await usersRepository.updateUser(id, newName);
    return isUpdated;
  },
};
