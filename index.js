import express from "express";
import { config } from "dotenv";
import router from "./source/controllers/router.js";
import { connectToDB } from "./source/models/__loaddatabase.js";

config();

const port = process.env.PORT || 8002;
const app = express();

// для использования переменной из .env в хэдере
app.locals.appTitle = process.env.APPTITLE || "Express";

// для стилей
app.use(express.static("public"));

// для использования ejs
app.set("view engine", "ejs");
app.set("views", "./source/templates");

(async () => {
  await connectToDB();
  app.use("/", router);
  app.listen(port);
}) ();

