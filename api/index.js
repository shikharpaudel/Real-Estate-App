import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
const conn = process.env.MONGO;
mongoose
  .connect(conn)
  .then(() => {
    console.log("connected to a database");
  })
  .catch((error) => {
    console.log(error);
  })
app.listen(5555, () => {
  console.log("running on port 5555");
});

app.use("/api/auth", authRouter);
app.use("/api/user" ,userRouter )

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  });

 })
