import mongoose,{Schema} from "mongoose";
import { type } from "node:os";
const GroupingSchema=new Schema({
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
export const Group=mongoose.model("Group",GroupingSchema);