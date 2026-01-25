import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
let app=express();
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());
app.use()
app.use(express.static('public'));


//routes
import router from './routes/user.routes.js'
app.use('/api/v1/users',router)

const errormiddleware=(err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Something went wrong";
    const errors=err.errors||[];
    return res.status(statusCode).json({
        statusCode,
        message,
        errors
    })
}
app.use(errormiddleware);
export default app;