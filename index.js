import express from "express";
import { config } from "dotenv";
import router from "./source/controllers/router.js";

config();

const port = process.env.PORT || 8002;
const app = express();

// для использования переменно из .env в хэдере
app.locals.appTitle = process.env.APPTITLE || "Express";

// для стилей
app.use(express.static("public"));

// для использования ejs
app.set("view engine", "ejs");
app.set("views", "./source/templates");

app.use("/", router);
app.listen(port);
