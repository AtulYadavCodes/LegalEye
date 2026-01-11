import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

let app=express();
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());
app.use(express.static('public'));


//routes
import router from './routes/user.routes.js'
app.use('/api/v1/users',router)
export default app;