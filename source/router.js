import session from "express-session";
import _FileStore from "session-file-store";
import cookieParser from "cookie-parser";
import { flash } from "express-flash-message";
import express from "express";
import { Router, urlencoded } from "express";
import methodOverride from "method-override";

import {
  registerPage,
  register,
  loginPage,
  login,
  logout,
} from "./controllers/users.js";
import { mainPage } from "./controllers/todos.js";
import {
  requestToContext,
  handleErrors,
  extendFlashAPI,
  getErrors,
  loadCurrentUser,
  isGuest,
  isLoggedIn,
} from "./middleware.js";
import { registerV, loginV } from "./validators.js";
import { mainErrorHandler, error500Handler } from "./error-handlers.js";

const FileStore = _FileStore(session);

const router = Router();
const exp = express();

router.use(cookieParser());

router.use(
  session({
    store: new FileStore({
      path: "./storage/sessions",
      reapAsync: true,
      reapSyncFallback: true,
      fallbackSessionFn: () => {
        return {};
      },
      logFn: () => {},
    }),
    secret: "abcdefgh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  }),
);

router.use(flash({ sessionKeyName: "flash-message" }));
router.use(extendFlashAPI);
router.use(loadCurrentUser);

router.use(urlencoded({ extended: true }));
router.use(methodOverride("_method"));

router.use(requestToContext);

router.get("/register", isGuest, getErrors, registerPage);
router.post("/register", isGuest, registerV, handleErrors, register);

router.get("/login", isGuest, getErrors, loginPage);
router.post("/login", isGuest, loginV, handleErrors, login);

router.use(isLoggedIn);

router.post("/logout", logout);

router.get("/", mainPage);
router.use(mainErrorHandler, error500Handler);

router.use(flash({ sessionKeyName: "flash-message" }));
router.use(extendFlashAPI);

exp.use(express.static("public"));

router.use("/uploaded", express.static("storage/uploaded"));
router.use(express.static("public"));

export default router;
