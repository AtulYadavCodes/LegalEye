import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import errorhandler from './errorhandler.js';

// Configuration
    cloudinary.config({ 
        cloud_name: process.env.cloudinary_name, 
        api_key: process.env.cloudinary_api_key, 
        api_secret: process.env.cloudinary_api_secret // Click 'View API Keys' above to copy your API secret
    });
    
    const uploadoncloudinary=async(filePath,option)=>{
        try {
            if(!filePath)return;
            const result= await cloudinary.uploader.upload(filePath,{ ...option,
                resource_type:"auto",
            });
            //file has been uploaded
            fs.unlinkSync(filePath); // Remove file from server after upload
            console.log(result.url);
            return result;
        } catch (error) {    
            if(filePath&&fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            }
            console.error("Cloudinary upload error:", error);
            throw new errorhandler(error?.statusCode || 500,error?.message || "Cloudinary upload failed",[error])

        }
    }

    export default uploadoncloudinary;