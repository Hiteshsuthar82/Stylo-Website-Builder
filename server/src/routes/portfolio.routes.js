import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";
import {
     createPortfolio,
     getPortfolio,
     updatePortfolio,
     deleteAllUserPortfolios,
     uploadPortfolioImage,
     deleteSpecificPortfolio,
     updatePortfoliobyid
    
    } from "../controllers/portfolio.controller.js";

const router = Router();

router.route("/create-portfolio").post(verifyJWT,createPortfolio);
router.route("/get-portfolio").get(verifyJWT,getPortfolio);
router.route("/update-portfolio").put(verifyJWT,updatePortfolio);
router.route("/delete-all-portfolio").delete(verifyJWT,deleteAllUserPortfolios);

router.route("/delete-portfolio/:portfolioId").delete(verifyJWT, deleteSpecificPortfolio);
router.route("/portfolio/:id").put(verifyJWT, updatePortfoliobyid);

router.route("/upload-images-portfolio").post(verifyJWT, upload.single("image"),uploadPortfolioImage);



export default router;

