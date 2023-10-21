import express from 'express';
import {updateUser} from '../controllers/user.controller.js'
import { userVerify } from '../utils/userVerify.js'

const userRouter = express.Router();

userRouter.post('/update/:id', userVerify,  updateUser);

export default userRouter;