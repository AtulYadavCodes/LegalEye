import mongoose from 'mongoose';
import { DBNAME } from '../constants.js';
const connectDB=(async()=>{
    try{
        const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
        console.log(`MongoDB connected: ${connectioninstance.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
})
export default connectDB;