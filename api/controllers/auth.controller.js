import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Listing from "../models/listing.model.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(402, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKEN);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatepassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatepassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo, 
       
      });
     
      await newUser.save();
      const token = jwt.sign({id:newUser._id},process.env.JWT_TOKEN);
      const {password:pass, ...rest} = newUser._doc;
      res.cookie("access_token" , token,{httpOnly:true}).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
//signOut
export const signOut= async (req,res,next)=>{
   try{
     res.clearCookie('access_token');
     res.status(200).json('Successfully Signed Out!')
   }catch(error){
  next(error);
   }
}
//for getting listing items
export const getListing= async (req,res,next)=>{
if(req.user.id === req.params.id){
try{
const listing = await Listing.find({userRef:req.params.id})
res.status(200).json(listing);
}catch(error){
  next(error);
}
}else{
  return next(errorHandler(402,"you can only view your listings!"))
}
}