import mongoose, { Schema } from "mongoose";
const folderschema=new Schema({
    foldername:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})
export const Folder=mongoose.model("Folder",folderschema);