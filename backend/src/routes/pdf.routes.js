import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getalluserpdfs, uploadpdf } from "../controllers/pdf.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/uploadpdf").post(verifyJWT, upload.single("file"), uploadpdf);
router.route("/getalluserpdfs").get(verifyJWT, getalluserpdfs);

export default router;