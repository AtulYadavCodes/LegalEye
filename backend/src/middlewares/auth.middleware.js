import { User } from "../models/users.model.js";
import { asyncHandler } from "../utils/asynchandler";
import error from "../utils/error.js"
export const verifyJWT=asyncHandler(async(req,res,next)=>{
    const token= req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ","")
    if(!token)
        throw new error(401,"Not authorized, token missing");
       const decodedToken= jwt.verify(token,process.env.JWT_SECRET)
       const user= await User.findById(decodedToken.userId).select("-password -refreshtoken");
       if(!user)
        throw new error(401,"Not authorized, user not found");
         req.user=user;
            next();
    })