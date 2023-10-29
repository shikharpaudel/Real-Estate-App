import express from 'express';
import { Listingprop, deleteListing } from '../controllers/listing.controller.js';
import { userVerify } from '../utils/userVerify.js';
const listingRouter = express.Router();
listingRouter.post('/create',userVerify,Listingprop);
listingRouter.delete('/delete/:id',userVerify,deleteListing)

export default listingRouter;