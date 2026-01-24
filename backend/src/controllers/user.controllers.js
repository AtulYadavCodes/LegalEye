import { asyncHandler } from "../utils/asynchandler.js";
import error_structurer from "../utils/error_structurer.js"
import {User} from "../models/users.model.js";
import uploadoncloudinary from "../utils/cloudinary.js";
import { response } from "express";
import responseHandler from "../utils/responsehandler.js"
const generateAccessTokenandRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId);
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
     //   user.accessToken=accessToken;
        user.refreshTokens=refreshToken;
       await user.save({validateBeforeSave: false});
        return {accessToken,refreshToken};
    } catch (error) {
        throw new error_structurer(500, "Token generation failed");
    }
}
const registerUser=asyncHandler(async(req,res,next)=>{
    const {name,username,email,password}=req.body;
    console.log(name,email,password);
    if(name==""||email==""||password=="")
    {
        throw new error_structurer(400,"All is required");
    }
    const userchecker=await User.findOne({email:email})
    if(userchecker)
        throw new error_structurer(400,"User already exists");
   const avatarlocalpath= req.files?.avatar[0]?.path
   if(!avatarlocalpath)
     throw new error_structurer(400,"Avatar is required");
    const cloudinaryresponse=await uploadoncloudinary(avatarlocalpath);

    if(!cloudinaryresponse)
        throw new error_structurer(500,"Image not uploaded");
   const user=await User.create({
        name,
        username,
        email,
        password,
        avatar: cloudinaryresponse.secure_url
    })
    const createduser= await User.findById(user._id).select("-password -refreshtoken");
    if(!createduser)
    {
        throw new error_structurer(500,"User not created");        
    }
    return res.status(200).json(
        new responseHandler(200,"User created successfully",createduser)
    )
})

const loginuser=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    if(email==""||password=="")
    {
        throw new error_structurer(400,"All fields are required");
    }
    const userchecker=await User.findOne({email:email});
    if(!userchecker)
        throw new error_structurer(400,"User does not exist");
    const isvalidpassword=await userchecker.isValidPassword(password);
    if(!isvalidpassword)
        throw new error_structurer(400,"Invalid credentials");  
    const {accessToken,refreshToken}=await generateAccessTokenandRefreshToken(userchecker._id);
    const loggedinuser= await User.findById(userchecker._id).select("-password -refreshtoken");
    const options={
        httpOnly:true,
        secure: true
      }
      return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new responseHandler(200,"User logged in successfully",{user:loggedinuser,accessToken,refreshToken}))
})

 const logoutuser=asyncHandler(async(req,res,next)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshTokens: undefined } },
        { new: true }
    )

    const options={
        httpOnly:true,
        secure: true,
    }
    return res.status(200).clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new responseHandler(200,"User logged out successfully",{}))
})
 const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken;
    if(!incomingRefreshToken)
        throw new error_structurer(401,"Refresh token not found");
    try {
        const decoded=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
    const user=await User.findById(decoded?._id);
    if(!user)
        throw new error_structurer(401,"User not found");
    if(!user.refreshTokens==(incomingRefreshToken))
        throw new error_structurer(401,"Invalid refresh token");
    const {accessToken,refreshToken}=await user.generateAccessToken(user._id);
    const options={
        httpOnly:true,
        secure: true
      }
      return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new responseHandler(200,"Access token refreshed successfully",{accessToken:accessToken}))
    } catch (error) {
        throw new error_structurer(401,error?.message||"Invalid refresh token");
    }
})

export {registerUser,loginuser,logoutuser,refreshAccessToken};