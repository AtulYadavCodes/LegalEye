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
//this is basically which can contain multiple pdfs and user 
// can create multiple groups to organize his files better but this has 
// limit of 16 mb array which mongo db can store so we can only store 16 mb of
//  file ids in one group so if user has more files 
// then he can create multiple groups to organize his files better 
//another method 
/*
first instead of grouping schema which will create folder schema which will have name and owner 
and then we can have grouping schema which will have name and owner and folderid and fileid
 so that we can create multiple documents in grouping collection for each file folder combination and then 
 we can query grouping collection to get all files in a folder for a user 

const folderSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
})
    export const Folder=mongoose.model("Folder",folderSchema);

const GroupingSchema=new Schema({

        owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        },
        folderid:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"folder"
        },
        fileid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PDF"
        }
 
        })
*/