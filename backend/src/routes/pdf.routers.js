import Router from 'express';
import { verifyJWT } from '../middlewares/auth.middleware';
import { getalluserpdfs } from '../controllers/pdf.controller';
import { uploadpdf } from '../controllers/pdf.controller';

import { upload } from '../middlewares/multer.middleware';
const router=Router();
router.route('/uploadpdf')/post(verifyJWT,upload.single('file'),uploadpdf);
router.route('/getalluserpdfs').get(verifyJWT,getalluserpdfs);
export default router;