import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();
const conn = process.env.MONGO;
mongoose.connect(conn).then(()=>{
    console.log("connected to a database")
}).catch((error)=>{
  console.log(error);
})

app.listen((5555),()=>{
    console.log("running on port 5555")
})