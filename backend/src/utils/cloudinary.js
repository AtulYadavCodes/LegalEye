import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
    cloudinary.config({ 
        cloud_name: process.env.cloudinary_name, 
        api_key: process.env.cloudinary_api_key, 
        api_secret: process.env.cloudinary_api_secret // Click 'View API Keys' above to copy your API secret
    });
    
    const uploadoncloudinary=async(filePath)=>{
        try {
            if(!filePath)return;
            const result= await cloudinary.uploader.upload(filePath,{
                resource_type:"auto",
            });
            //file has been uploaded
            console.log(result.url);
            return result;
        } catch (error) {    
            fs.unlinkSync(filePath);

        }
    }

    export default uploadoncloudinary;