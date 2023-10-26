import express from 'express';
import { Listingprop } from '../controllers/listing.controller.js';
import { userVerify } from '../utils/userVerify.js';
const listingRouter = express.Router();
listingRouter.post('/create',userVerify,Listingprop);
export default listingRouter;