import express from "express";
import { signUp } from "../controllers/auth.controller.js";
import { signIn } from "../controllers/auth.controller.js";
const authRouter = express.Router();
authRouter.post('/signUp',signUp);
authRouter.post('/signIn',signIn);
export default authRouter;