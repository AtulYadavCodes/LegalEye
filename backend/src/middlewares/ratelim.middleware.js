import { error } from "node:console";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorhandler from "../utils/errorhandler.js";
import redis from "../db/redis.js";

export const ratelimMiddleware=asyncHandler(async(req,res,next)=>{
    const ip=req.ip;
    const key=`login:${req.body.email}:${req.ip}`;
    const attempts=await redis.get(key);
    /*if(attempts===1){
        await redis.expire(key,60);
    }
        */
    if(attempts&&attempts>5){
        throw new errorhandler(429,"Too many login attempts. Please try again later.",);
    }
    next();
})