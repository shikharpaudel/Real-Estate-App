import express from 'express';
import {deleteUser, updateUser} from '../controllers/user.controller.js'
import { userVerify } from '../utils/userVerify.js'

const userRouter = express.Router();

userRouter.post('/update/:id', userVerify,  updateUser);
userRouter.delete('/delete/:id', userVerify,  deleteUser);

export default userRouter;