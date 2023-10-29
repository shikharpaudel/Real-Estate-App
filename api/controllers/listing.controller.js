import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export const Listingprop =async (req,res,next)=>{
    try{
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
   
    }catch(error){
        next(error);
    }
}
//delete listing by id
export const deleteListing= async(req,res,next)=>{
    const listing = Listing.findById(req.params.id);
    if(!listing){
        next(errorHandler(404,"Listing not found!"))
        return;
    }
    if(req.user._id !== listing.userRef){
        next(errorHandler(401,"You Are not authorized to delete this listing!"));
        return;
    }
    try{
   await Listing.findByIdAndDelete(req.params.id);
   res.status(200).json("successfully deleted listing");
    }catch(error){
        next(error);
    }
}

