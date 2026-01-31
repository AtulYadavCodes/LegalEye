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