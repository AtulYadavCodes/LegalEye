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


//secured routes
router.route('/logout').post(verifyJWT,logoutuser);
router.route('/refreshAccessToken').post(refreshAccessToken);
export default router