import express from "express";
import { signOut, signUp } from "../controllers/auth.controller.js";
import { signIn,google } from "../controllers/auth.controller.js";

const authRouter = express.Router();
authRouter.post('/signUp',signUp);
authRouter.post('/signIn',signIn);
authRouter.post('/google',google);
authRouter.get('/signout', signOut);
export default authRouter;