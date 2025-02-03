import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";
import {
    createPortfolio,
    getPortfolio,
    getPortfolioById,
    deleteAllUserPortfolios,
    uploadPortfolioImage,
    deleteSpecificPortfolio,
    updatePortfoliobyid,
    deployWebsite,
    reDeployWebsite
} from "../controllers/portfolio.controller.js";

const router = Router();

router.route("/create-portfolio").post(verifyJWT, createPortfolio);
router.route("/get-all-portfolio").get(verifyJWT, getPortfolio);
router.route("/get-portfolio/:portfolioId").get(verifyJWT, getPortfolioById);
router.route("/delete-all-portfolio").delete(verifyJWT, deleteAllUserPortfolios);

router.route("/delete-portfolio/:id").delete(verifyJWT, deleteSpecificPortfolio);
router.route("/update-portfolio/:id").patch(verifyJWT, updatePortfoliobyid);

router.route("/upload-images-portfolio").post(verifyJWT, upload.single("image"), uploadPortfolioImage);


router.route("/deploy-website/:id").patch(verifyJWT, deployWebsite);
router.route("/reDeploy-website/:id").patch(verifyJWT, reDeployWebsite);


export default router;
