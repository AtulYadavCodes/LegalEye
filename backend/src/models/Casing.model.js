import mongoose,{Schema} from "mongoose";
import { type } from "node:os";
const CasingSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    files:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PDF"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
});
export const Casing=mongoose.model("Casing",CasingSchema);