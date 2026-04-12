import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { loginuser, logoutuser, registerUser,refreshAccessToken, returnuserProfile,updateuseravatar,updateuserpassword,updateuseremail} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

import { ratelimMiddleware } from "../middlewares/ratelim.middleware.js"
const router=Router()
router.route('/register').post(
    upload.single('avatar'),
    registerUser)
router.route('/login').post(upload.none(),ratelimMiddleware, loginuser)


//secured routes 
router.route('/logout').post(verifyJWT,logoutuser);
router.route('/refreshAccessToken').post(refreshAccessToken);
router.route('/profile').get(verifyJWT,returnuserProfile);
router.route('/updateprofileavatar').patch(verifyJWT,upload.single('avatar'),updateuseravatar);
router.route('/updatepassword').post(verifyJWT,upload.none(),updateuserpassword);
router.route('/updateemail').patch(verifyJWT,upload.none(),updateuseremail);
export default router