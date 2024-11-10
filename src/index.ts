import { app } from "./app";
import { runDb } from "./db/db.mongodb";

const port = process.env.PORT || 3003;

const launchApp = async () => {
  await runDb();
  app.listen(port, () => console.log(`listening port: ${port}`));
};

launchApp();
