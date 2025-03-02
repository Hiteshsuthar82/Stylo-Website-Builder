import { Router } from "express";

import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    deleteAdmin,
    getAllUsers,
    deleteUser,
    deleteAllUsers,
    getPremiumUsers,
    getNonPremiumUsers,
    getUsersByRole,
    getVerifiedUsers,
    getNonVerifiedUsers

} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


// Register Admin
router.post("/register", registerAdmin);

// login admin
router.post("/login", loginAdmin);

// logout admin
router.post("/logout",verifyJWT, logoutAdmin);

// Delete Admin
router.route("/delete-admin-account").delete(verifyJWT, deleteAdmin);

// getallusers
router.route("/allusers").get(verifyJWT, getAllUsers);

// delete single user
router.route("/delete-user/:userId").delete(verifyJWT, deleteUser);



// delete all users
router.route("/delete-all-users").delete(verifyJWT, deleteAllUsers);

// get premium users
router.route("/premium-users").get(verifyJWT, getPremiumUsers);

// get non-premium users
router.route("/non-premium-users").get(verifyJWT, getNonPremiumUsers);

// get users by role
router.route("/users-by-role/:role").get(verifyJWT, getUsersByRole);

// get verified users
router.route("/verified-users").get(verifyJWT, getVerifiedUsers);

// get non-verified users
router.route("/non-verified-users").get(verifyJWT, getNonVerifiedUsers);

export default router;







