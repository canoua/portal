import { Router } from "express";

import { mainPage, signinPage, signupPage } from "./portal.js";

const router = Router();

router.get('/', mainPage);
router.get('/signin', signinPage);
router.get('/signup', signupPage);

export default router;