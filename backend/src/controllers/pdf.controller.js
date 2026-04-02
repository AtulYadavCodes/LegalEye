import mongoose from "mongoose";
import { responseHandler } from "../utils/responseHandler.js";
import asyncHandler from "../utils/asynchandler.js";
import { error_structurer } from "../utils/errorStructurer.js";
import { PDF } from "../models/pdf.models.js";
const getalluserpdfs=asyncHandler(async (req, res) => {
    const { page=1,limit=10,sortby="createdAt", sorttype="desc" }=req.query;
    const userpdfs=await PDF.aggregate([
        { $match:{
            owner:new mongoose.Types.ObjectId(req.user._id)
        }
    },{
        $sort:{
           [sortby]:sorttype==='asc'?1:-1
        }
    }
    ,
    {
        $skip:(Number(page)-1)*limit ,
        $limit: Number(limit)
    }
    ]);
    if(!userpdfs||userpdfs.length===0){
        return res.status(404).json(error_structurer(404,"pdfs not found",[]));
    }
    res.status(200).json(new responseHandler(200,"User PDFs fetched successfully",userpdfs));
})

const uploadpdf=asyncHandler(async(req,res)=>{
    if(!req.file){
        return res.status(400).json(error_structurer(400,"No PDF file uploaded",null));
    }
    const cloudinaryresponse=await uploadoncloudinary(req.file.path,{ pages:true, folder:"pdfs"});
    if(!cloudinaryresponse)
     throw new error_structurer(500,"fileuploaderror",[])
    const newpdf=await PDF.create({
        pdfFile:cloudinaryresponse.secure_url,
        filename:req.file.originalname,
        owner:req.user._id,
        page:cloudinaryresponse.pages,
        filesize:cloudinaryresponse.bytes,
        filepreviewimages:`https://res.cloudinary.com/${process.env.cloudinary_name}/image/upload/pg_1,w_300,h_400,c_fill,q_auto,f_auto/pdfs/${cloudinaryresponse.public_id}.png`||"https://res.cloudinary.com/dzcmadjlq/image/upload/v1696543783/ClauseValidator/default_pdf_oyh3v0.png"
    });
    const savedpdf=await PDF.findById(newpdf._id);
    if(!savedpdf){
        return res.status(500).json(error_structurer(500,"PDF not saved",null));
    }
    res.status(200).json(new responseHandler(200,"PDF uploaded successfully",savedpdf));

})
export {getalluserpdfs,uploadpdf};