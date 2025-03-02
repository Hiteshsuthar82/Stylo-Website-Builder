import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

import sendEmail from "../utils/EmailSent.js";
import { generateOtp } from "../utils/OtpGenrator.js";
import { generateAccessAndRefreshToken } from "./user.controller.js";

// 1. register a admin

export const registerAdmin = asyncHandler(async (req, res) => {
  // Getting the data from frontend
  const { username, fullName, password, email, role } = req.body;

  // Validating and formatting the data
  if ([username, fullName, password, email, role].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  // Validate role (must be "admin" or "user")
  if (!["admin", "user"].includes(role)) {
    throw new ApiError(400, "Invalid role. Role must be either 'admin' or 'user'.");
  }

  // Checking if admin already exists
  const adminExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (adminExist) {
    return res.status(400).json(new ApiResponse(400, [], "User already exists."));
  }

  // Create new admin
  const createdAdmin = await User.create({
    username: username.toLowerCase(),
    fullName,
    password,
    email,
    role, // Role is taken from the request body
  });

  // Generate OTP
  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

  // Save OTP and expiry
  createdAdmin.otp = otp;
  createdAdmin.otpExpiry = otpExpiry;
  await createdAdmin.save();

  // Fetch admin details without password & refreshToken
  const adminData = await User.findById(createdAdmin._id).select(
    "-password -refreshToken -otp -otpExpiry"
  );

  if (!adminData) {
    throw new ApiError(500, "Something went wrong while registering the admin.");
  }

  // Send verification email
  await sendEmail(adminData.email, "Email Verification OTP", "admin_otp", {
    fullName: adminData.fullName || adminData.username,
    otp: otp,
  });

  // Send response
  return res.status(201).json(
    new ApiResponse(
      200,
      adminData,
      "Admin Account Created Successfully. Please verify your email using the OTP sent to your email."
    )
  );
});



// 2. admin login

export const loginAdmin = asyncHandler(async (req, res) => {
  let { email, password, username } = req.body;

  // Validate input
  if ((!email && !username) || !password) {
    throw new ApiError(400, "Username or Email is required");
  }

  // Find user
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, [], "User not Found"));
  }

  // Check if the user is an admin
  if (user.role !== "admin") {
    return res.status(403).json(new ApiResponse(403, [], "Access Denied. Only admins can log in here."));
  }

  // Validate password
  const isCredentialValid = await user.isPasswordCorrect(password);
  if (!isCredentialValid) {
    return res.status(401).json(new ApiResponse(401, [], "Invalid Credentials"));
  }

  // Generate and store tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  // Fetch user details without sensitive information
  const loggedInAdmin = await User.findById(user._id).select(
    "-password -refreshToken -otp -otpExpiry"
  );

  // Set access token in cookie
  res.setHeader(
    "Set-Cookie",
    `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60 * 1000}; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
  );

  // Send response
  return res.status(200).json(
    new ApiResponse(
      200,
      { user: loggedInAdmin, accessToken, refreshToken },
      "Admin Logged In Successfully"
    )
  );
});



// 3. admin logout

export const logoutAdmin = asyncHandler(async (req, res) => {
  // Get the admin's ID from the request object (set by the authentication middleware)
  const adminId = req.user?._id;

  // Clear the refresh token in the database
  await User.findByIdAndUpdate(
    adminId,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  // Clear the access token cookie
  res.setHeader(
    "Set-Cookie",
    `accessToken=; Max-Age=0; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
  );

  // Send response
  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Admin logged out successfully"
    )
  );
});

// 4. admin delete account 
export const deleteAdmin = asyncHandler(async (req, res) => {
  const adminId = req.user?._id;

  // Check if admin exists
  const admin = await User.findById(adminId);
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Ensure the user is an admin
  if (admin.role !== "admin") {
    throw new ApiError(403, "Access Denied. Only admins can perform this action.");
  }

  // Delete admin from database
  await User.findByIdAndDelete(adminId);

  // Clear authentication cookies
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.setHeader(
    "Set-Cookie",
    `accessToken=; Max-Age=-1; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
  );

  return res.status(200).json(new ApiResponse(200, {}, "Admin account deleted successfully"));
});



// 5. get all data of the users

// export const getAllUsers = asyncHandler(async (req, res) => {
//   const adminId = req.user?._id;

//   // Check if admin exists
//   const admin = await User.findById(adminId);
//   if (!admin) {
//     throw new ApiError(404, "Admin not found");
//   }

//   // Ensure the user is an admin
//   if (admin.role !== "admin") {
//     throw new ApiError(403, "Access Denied. Only admins can perform this action.");
//   }

//   // Fetch all users
//   const users = await User.find({}).select("-password"); // Exclude password for security

//   return res.status(200).json(new ApiResponse(200, users, "All users fetched successfully"));
// });

export const getAllUsers = asyncHandler(async (req, res) => {
  const adminId = req.user?._id;

  // Check if admin exists
  const admin = await User.findById(adminId);
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Ensure the user is an admin
  if (admin.role !== "admin") {
    throw new ApiError(403, "Access Denied. Only admins can perform this action.");
  }

  // Fetch all users except the logged-in admin
  const users = await User.find({ _id: { $ne: adminId } }).select("-password"); 
  const userCount = users.length;

  return res.status(200).json(new ApiResponse(200, { users,  userCount }, "All users fetched successfully"));
});




// 6. delete single user

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access Denied. Only admins can perform this action.");
  }

  const { userId } = req.params;
  
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  await User.findByIdAndDelete(userId);

  return res.status(200).json(new ApiResponse(200, {}, "User deleted successfully."));
});





// 8. delete all users

export const deleteAllUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access Denied. Only admins can perform this action.");
  }

  // Delete all users except the logged-in admin
  const deletedUsers = await User.deleteMany({ _id: { $ne: req.user._id } });

  if (deletedUsers.deletedCount === 0) {
    throw new ApiError(404, "No users found to delete.");
  }

  return res.status(200).json(new ApiResponse(200, {}, "All users deleted successfully, except the logged-in admin."));
});


// 9. get all isPremium true user


export const getPremiumUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access Denied. Only admins can view this data.");
  }

  // Fetch all premium users except the logged-in admin
  const premiumUsers = await User.find({ isPremium: true, _id: { $ne: req.user._id } }).select("-password");
  const userCount = premiumUsers.length;


  if (!premiumUsers.length) {
    throw new ApiError(404, "No premium users found");
  }

  return res.status(200).json(new ApiResponse(200, {users:premiumUsers, userCount}, "All premium users fetched successfully"));
});


// 10. get all ispremimum==>false users



export const getNonPremiumUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access Denied. Only admins can view this data.");
  }

  // Fetch all non-premium users except the logged-in admin
  const nonPremiumUsers = await User.find({ isPremium: false, _id: { $ne: req.user._id } }).select("-password");
  const userCount = nonPremiumUsers.length;


  if (!nonPremiumUsers.length) {
    throw new ApiError(404, "No non-premium users found");
  }

  return res.status(200).json(new ApiResponse(200, {users:nonPremiumUsers, userCount}, "All non-premium users fetched successfully"));
});


// 11. get all users by their role

export const getUsersByRole = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access Denied. Only admins can view this data.");
  }

  const { role } = req.params;

  if (!["admin", "user"].includes(role)) {
    throw new ApiError(400, "Invalid role. Role must be either 'admin' or 'user'.");
  }

  const users = await User.find({ role }).select("-password");
  const userCount = users.length;


  if (!users.length) {
    throw new ApiError(404, `No users found with role '${role}'`);
  }

  return res.status(200).json(new ApiResponse(200, {users, userCount}, `All users with role '${role}' fetched successfully`));
});

// 12. get all users by their isVerified true



export const getVerifiedUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access Denied. Only admins can view this data.");
  }

  // Fetch all verified users except the logged-in admin
  const verifiedUsers = await User.find({ isVerified: true, _id: { $ne: req.user._id } }).select("-password");
  const userCount = verifiedUsers.length;


  if (!verifiedUsers.length) {
    throw new ApiError(404, "No verified users found");
  }

  return res.status(200).json(new ApiResponse(200, {users:verifiedUsers, userCount}, "All verified users fetched successfully"));
});


// 13. get all users by their isVerified false



export const getNonVerifiedUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access Denied. Only admins can view this data.");
  }

  // Fetch all non-verified users except the logged-in admin
  const nonVerifiedUsers = await User.find({ isVerified: false, _id: { $ne: req.user._id } }).select("-password");
  const userCount = nonVerifiedUsers.length;


  if (!nonVerifiedUsers.length) {
    throw new ApiError(404, "No non-verified users found");
  }

  return res.status(200).json(new ApiResponse(200, {users:nonVerifiedUsers, userCount}, "All non-verified users fetched successfully"));
});








