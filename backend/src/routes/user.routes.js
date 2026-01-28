import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { loginuser, logoutuser, registerUser,refreshAccessToken } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { log } from "console"
const router=Router()
router.route('/register').post(
    upload.single('avatar'),
    registerUser)
router.route('/login').post(upload.none(), loginuser)


//secured routes all using upload.none() to parse multipart/form-data with no files considering frontend sends formdata for all requests
router.route('/logout').post(verifyJWT,logoutuser);
router.route('/refreshAccessToken').post(refreshAccessToken);
router.route('/profile').get(verifyJWT,returnuserProfile);
router.route('/updateprofileavatar').patch(verifyJWT,upload.single('avatar'),updateuseravatar);
router.route('/updatepassword').post(verifyJWT,upload.none(),updateuserpassword);
router.route('/updateemail').patch(verifyJWT,upload.none(),updateuseremail);
export default router