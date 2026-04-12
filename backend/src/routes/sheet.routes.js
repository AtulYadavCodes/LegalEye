import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { /*getallusersheets,*/uploadsheet } from '../controllers/sheet.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router=Router();
router.route('/uploadsheet/:folderid').post(verifyJWT,upload.single('file'),uploadsheet);
//router.route('/getallusersheets').get(verifyJWT,getallusersheets);
export default router;