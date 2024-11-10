import { MongoClient } from "mongodb";
import { DbUserModel } from "./db.memory";

const uri = "mongodb://localhost:27017";

export const client = new MongoClient(uri);

// async function listDatabases(client: any) {
//   const databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach((db: any) => console.log(` - ${db.name}`));
// }

const usersDb = client.db("users");
export const usersCollection = usersDb.collection<DbUserModel>("usersDocs");

export const runDb = async () => {
  try {
    await client.connect();
    // await listDatabases(client);
    console.log(`connected successfully to db`);
  } catch (error) {
    console.error(error);
    await client.close();
    console.log("connection to db server is closed");
  }
};
