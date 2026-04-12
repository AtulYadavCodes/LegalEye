import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorhandler from "../utils/errorhandler.js"
import jwt from "jsonwebtoken";
export const verifyJWT=asyncHandler(async(req,res,next)=>{
    const token= req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ","")
    if(!token)
        throw new errorhandler(401,"Not authorized, token missing");
       const decodedToken= jwt.verify(token,process.env.JWT_SECRET)
       const user= await User.findById(decodedToken.userId).select("-password -refreshtoken");
       if(!user)
        throw new errorhandler(401,"Not authorized, user not found");
         req.user=user;
         next();
})