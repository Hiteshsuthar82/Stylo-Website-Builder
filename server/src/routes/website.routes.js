import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";
import {
    createWebsite,
    getAllWebsites,
    getWebsiteById,
    deleteAllWebsites,
    uploadWebsiteImage,
    deleteSpecificWebsite,
    updateWebsite,
    deployWebsite,
    reDeployWebsite,
    sendMail,
    onlyuploadImage
} from "../controllers/website.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, createWebsite);
router.route("/get-all").get(verifyJWT, getAllWebsites);
router.route("/:websiteType/:websiteId").get(verifyJWT, getWebsiteById);
router.route("/delete-all/:websiteType").delete(verifyJWT, deleteAllWebsites);
router.route("/delete/:websiteType/:id").delete(verifyJWT, deleteSpecificWebsite);
router.route("/update/:websiteType/:id").patch(verifyJWT, updateWebsite);
router.route("/upload-images").post(verifyJWT, upload.single("image"), uploadWebsiteImage);
router.route("/deploy/:websiteType/:id").patch(verifyJWT, deployWebsite);
router.route("/redeploy/:websiteType/:id").patch(verifyJWT, reDeployWebsite);

router.route("/send-email/:websiteType/:id").post(sendMail);

router
  .route("/image-upload")
  .patch(verifyJWT, upload.single("image"), onlyuploadImage);

export default router;