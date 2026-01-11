import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { loginuser, logoutuser, registerUser } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { log } from "console"
const router=Router()
router.route('/register').post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
    ]),
    registerUser)
router.route('/login').post(loginuser)


//secured routes
router.route('/logout').post(verifyJWT,logoutuser)  
export default router