import { 
    insertDummyData, 
    editResume, 
    uploadImage,
    getPermanentResume,
    updateResumeByResumeId,
    updateUserAvatar ,
    getResumesByUserId,
    getResumeById,
    deleteResumeById,
    deleteAllResumesByUserId

 } from "../controllers/templete2.controller.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js";
 import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";

const router = Router();

// ## insert dummy data in db routes
router.route("/resume-data").get(insertDummyData);

//  ##for create resume form the dummy data
router.route("/edit-resume").post(verifyJWT,editResume);

//  ## upload resume image first time store in user schema
router.route("/upload-image").post(verifyJWT, upload.single("image"),uploadImage);

//  ## update the resume using resumeid
router.route("/resume-edit/:resumeId").patch(verifyJWT,updateResumeByResumeId);

// ## update the resume image using resumeid
router
.route("/image/:resumeId")
.patch(verifyJWT, upload.single("image"), updateUserAvatar);

//  ## get the resume using loggedin userid 
router.route("/Allresume").get(verifyJWT,getResumesByUserId);

// ## get the resume when the user permentdetail {TRUE}
router.route("/usersPermanentDetais").get(verifyJWT,getPermanentResume);

//  ## delete the ALLresumes using LOGGEDINuserid
router.route("/delete-Allresume").delete(verifyJWT,deleteAllResumesByUserId);

//  ## get the resume by resumeid
router.route("/resume-data/:resumeId").get(verifyJWT,getResumeById);

//  ## delete the resume using resumeid
router.route("/delete/resume/:resumeId").delete(verifyJWT,deleteResumeById);



export default router;