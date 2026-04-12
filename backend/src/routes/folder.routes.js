import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {Folder} from "../models/folder.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createfolder,getalluserfolders,deletefolder,allsheetsinfolder } from "../controllers/folder.controller.js";

const router=Router();
router.route('/createfolder').post(verifyJWT,upload.none(),createfolder);
router.route('/getalluserfolders').get(verifyJWT,getalluserfolders);
router.route('/deletefolder/:folderid').delete(verifyJWT,deletefolder);
router.route('/getallsheetsinfolder/:folderid').get(verifyJWT,allsheetsinfolder);
export default router;