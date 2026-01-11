import 'dotenv/config';
import connectDB from "./db/index.js";
import app from './app.js';

connectDB()
.then(()=>{app.listen(8000||process.env.PORT,()=>{console.log(`Server started on port ${8000||process.env.PORT}`)})})
.catch((err)=>{console.log(err)});