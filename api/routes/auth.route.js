import express from "express";
import { signOut, signUp } from "../controllers/auth.controller.js";
import { signIn,google } from "../controllers/auth.controller.js";
import { userVerify } from "../utils/userVerify.js";
import { getListing } from "../controllers/auth.controller.js";

const authRouter = express.Router();
authRouter.post('/signUp',signUp);
authRouter.post('/signIn',signIn);
authRouter.post('/google',google);
authRouter.get('/signout', signOut);
authRouter.get('/listing/:id',userVerify,getListing);
export default authRouter;