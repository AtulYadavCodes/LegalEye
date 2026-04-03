import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const pdfschema=new Schema({
    pdfFile:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    page:{
        type:Number,
        required:true
    },
    filesize:{
        type:Number,
        required:true
    }, 
    filepreviewimages:{
        type: String , //url cloudinary
        default:"https://res.cloudinary.com/dzcmadjlq/image/upload/v1696543783/ClauseValidator/default_pdf_oyh3v0.png"
    }
},{
    timestamps:true
})
pdfschema.plugin(mongooseAggregatePaginate);
export const PDF=mongoose.model("PDF",pdfschema);
 //variable is outer pdf and inner is model name and schema name respectively
 //mongoose auto creates collection name as plural of model name and in small letters i.e. pdfs