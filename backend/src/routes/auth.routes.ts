import { Router } from "express";
import { postLogin, postSignUp } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signup', postSignUp);
router.post('/login', postLogin);

export default router;


