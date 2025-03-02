import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  updateUserProfile,
  getCurrentUser,
  updateUserAvatar,
  onlyuploadImage,
  upgradeToPremium,
  deleteAccount,
  verifyEmailOtp,
  resendOtp
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT,refreshAccessToken);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);


router.route("/get-current-user").get(verifyJWT, getCurrentUser);

router.route("/upgrade-to-premium").patch(verifyJWT, upgradeToPremium);
router.route("/update-profile").patch(verifyJWT, updateUserProfile);
router.route("/change-password").patch(verifyJWT, changePassword);
router.route("/delete-account").delete(verifyJWT, deleteAccount);

// only image uplaod and delete image route
router
  .route("/image-upload")
  .patch(verifyJWT, upload.single("image"), onlyuploadImage);

  // Verify email OTP
router.post("/verify-email", verifyEmailOtp);
router.post("/resend-otp", resendOtp);

export default router;
