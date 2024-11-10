import { app } from "./app";
import { runDb } from "./db/db.mongodb";

const port = 3003;

const launchApp = async () => {
  await runDb();
  app.listen(port, () => console.log(`listening port: ${port}`));
};

launchApp();
