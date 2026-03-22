import express from "express";
import { config } from "dotenv";
import router from "./source/router.js";
import { connectionToDB } from "./source/models/__loaddatabase.js";

config();

const port = process.env.PORT || 8000;
const app = express();

app.locals.appTitle = process.env.APPTITLE || "Express";
// для стилей
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./source/templates");

(async () => {
  await connectionToDB();
  app.use("/", router);
  app.listen(port);
})();
