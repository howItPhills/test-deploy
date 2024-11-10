import { DbUserModel } from "../db/db.memory";
import { usersCollection } from "../db/db.mongodb";

export const usersRepository = {
  async getUsers(name: string | undefined) {
    let filter = {};
    if (name) {
      filter = { name: { $regex: name } };
    }
    return await usersCollection.find(filter).toArray();
  },
  async getUserById(id: string) {
    return await usersCollection.findOne({ id: +id });
  },
  async createUser(newUser: DbUserModel) {
    await usersCollection.insertOne(newUser);
    return newUser;
  },
  async deleteUser(id: string) {
    const result = await usersCollection.deleteOne({ id: +id });
    return result.deletedCount === 1;
  },
  async updateUser(id: string, newName: string) {
    const result = await usersCollection.updateOne(
      { id: +id },
      { $set: { name: newName } }
    );
    return result.matchedCount === 1;
  },
  async tests() {
    await usersCollection.deleteMany({});
  },
};
