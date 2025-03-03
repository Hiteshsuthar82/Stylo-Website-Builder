import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  deleteImageOnCloudinary,
  uploadPhotoOnCloudinary as uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { generateOtp } from "../utils/OtpGenrator.js";
import sendEmail from "../utils/EmailSent.js";

// 1>> registerUser

const registerUser = asyncHandler(async (req, res) => {
  // Getting the data from frontend
  let { username, password, fullName, email } = req.body;
  console.log("this is avtar", req.files);

  // Validating and formating the data
  if (
    [username, password, fullName, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, `all fields are required!!!`);
  }

  // checking if user exists or not
  const userExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExist) {
    // throw new APIError(400, "User Already Exists...");
    return res
      .status(400)
      .json(new ApiResponse(400, [], "User Already Exists..."));
  }

  // Handling File

  let avatarLocalPath = "";
  if (req.files && req.files.avatar && req.files?.avatar.length > 0) {
    avatarLocalPath = req.files?.avatar[0]?.path;
  }

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "avatar Image is Required");
  // }

  // uploading on cloudinary

  let avatarRes = await uploadOnCloudinary(avatarLocalPath);
  // if (!avatarRes)
  //   throw new ApiError(500, "Internal Server Error!!! Files Unable to Upload");

  // Create new user
  const createdUser = await User.create({
    username: username.toLowerCase(),
    password,
    email,
    fullName,
    // avatar: avatarRes.url,
  });

  // Generate OTP
  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

  // Save OTP and expiry
  createdUser.otp = otp;
  createdUser.otpExpiry = otpExpiry;
  await createdUser.save();

  // Fetch user details without password & refreshToken
  const userData = await User.findById(createdUser._id).select(
    "-password -refreshToken -otp -otpExpiry"
  );

  if (!userData) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Send verification email
  await sendEmail(userData.email, "Email Verification OTP", "register_otp", {
    fullName: userData.fullName || userData.username,
    otp: otp,
  });

  // Send back data to frontend
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        userData,
        "Account Created Successfully. Please verify your email using the OTP sent to your email."
      )
    );
});

//  >> loginuser

const loginUser = asyncHandler(async (req, res) => {
  // data <- req.body
  // validate data
  // find User
  // generate tokens
  // store tokens in database
  // set tokens in cookie
  // send response

  // data <- req.body

  let { email, password, username } = req.body;

  // validate
  if ((!email && !username) || !password) {
    throw new ApiError(400, "Username or Email is required");
  }

  // find User
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    // throw new APIError(404, "User not Found");
    return res.status(404).json(new ApiResponse(404, [], "User not Found"));
  }

  const isCredentialValid = await user.isPasswordCorrect(password);
  if (!isCredentialValid) {
    // throw new APIError(401, "Credential Invalid");
    return res
      .status(401)
      .json(new ApiResponse(401, [], "Invalid Credentials"));
  }

  // generate and store tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -watchHistory"
  );

  // set tokens in cookie and send response
  // const cookieOptions = {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  //   Partitioned: true,
  // };

  res.setHeader(
    "Set-Cookie",
    `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60 * 1000}; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
  );

  // res.setHeader(
  //   "Set-Cookie",
  //   `__Host-refreshToken=${refreshToken}; Max-Age=${10 * 24 * 60 * 60 * 1000}; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
  // );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "Logged In Successfully"
      )
    );
});

//  >> logout user

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.setHeader(
    "Set-Cookie",
    `accessToken=; Max-Age=-1; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
  );

  // .clearCookie("accessToken", {
  //   ...cookieOptions,
  //   maxAge: 1 * 24 * 60 * 60 * 1000,
  // })
  // .clearCookie("refreshToken", {
  //   ...cookieOptions,
  //   maxAge: 10 * 24 * 60 * 60 * 1000,
  // })

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Logged out Successfully"));
});

// currentuser

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(201, req.user, "User fetched Successfully"));
});

//   profileimage update
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "File required");
  }

  const avatarImg = await uploadOnCloudinary(avatarLocalPath);

  if (!avatarImg) {
    throw new ApiError(500, "Error Accured While uploading File");
  }

  await deleteImageOnCloudinary(req.user?.avatar);

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { avatar: avatarImg.url },
    },
    {
      new: true,
    }
  ).select("-password");

  if (!updatedUser) {
    new ApiError(500, "Error while Updating database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "avatar updated Successfully"));
});

// genrate new accestoken
const generateAccessAndRefreshToken = async (_id) => {
  try {
    const user = await User.findById(_id);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

//  >> accestoken ko refersh karke naya token bhejta he

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  console.log(req.cookies);

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      Partitioned: true,
    };

    res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60 * 1000}; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
    );

    // res.setHeader(
    //   "Set-Cookie",
    //   `refreshToken=${refreshToken}; Max-Age=${10 * 24 * 60 * 60 * 1000}; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
    // );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken: refreshToken },
          "Access Token Granted Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

//  >> upgrade normal user to premium user
const upgradeToPremium = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { orderId, planType, buyingDateAndTime } = req.body;

  const user = await User.findById(userId).select(
    "-password -otp -otpExpiry -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  user.isPremium = true;
  user.planDetails = {
    planType,
    buyingDateAndTime,
    orderId,
  };
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "You are now a premium user!"));
});

//  >> profileupdate

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, username } = req.body;

  console.log(req.body);
  

  if (!fullName && !email && !username) {
    throw new ApiError(400, "At least one field required");
  }

  const user = await User.findById(req.user?._id);

  if (fullName) user.fullName = fullName;

  if (email){ 
    user.isVerified = false;
    user.email = email
  };

  if (username) {
    const isExists = await User.find({ username });
    if (isExists?.length > 0) {
      throw new ApiError(400, "Username not available");
    } else {
      user.username = username;
    }
  }

  const updatedUserData = await user.save();

  if (!updatedUserData) {
    new ApiError(500, "Error while Updating User Data");
  }

  delete updatedUserData.password;

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUserData, "Profile updated Successfully")
    );
});

//   >> passwordchange

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Caution
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All Fields Required");
  }

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Old Password is not Correct");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

//  >> Delete Acount

const deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Delete user from database
  await User.findByIdAndDelete(userId);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  // Clear authentication cookies
  res.setHeader(
    "Set-Cookie",
    `accessToken=; Max-Age=-1; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account deleted successfully"));
});

const onlyuploadImage = asyncHandler(async (req, res) => {
  const { url } = req.body; // Extracting URL from request body
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "File required");
  }

  // Upload new image
  const avatarImg = await uploadOnCloudinary(avatarLocalPath);

  if (!avatarImg) {
    throw new ApiError(500, "Error occurred while uploading file");
  }

  // If old URL exists, delete it
  if (url) {
    await deleteImageOnCloudinary(url);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, avatarImg.url, "Image uploaded successfully"));
});

const verifyEmailOtp = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body;

  // Validate input
  if (!userId || !otp) {
    throw new ApiError(400, "User ID and OTP are required");
  }

  // Find the user
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

// Check if OTP is incorrect
if (user.otp !== otp) {
  throw new ApiError(400, "Invalid OTP");
}

// Check if OTP is expired
if (user.otpExpiry < new Date()) {
  throw new ApiError(400, "OTP has expired");
}


  // Update user's verification status
  user.isVerified = true;
  user.otp = undefined; // Clear the OTP
  user.otpExpiry = undefined; // Clear the OTP expiry
  await user.save();

  await sendEmail(user.email, "Account Verification Successful", "account_verified", {
    Name: user.fullName || user.username,
  });
  
  // Send success response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email verified successfully"));
});

const resendOtp = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Validate input
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  // Find the user
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if user is already verified
  if (user.isVerified) {
    throw new ApiError(400, "User is already verified");
  }

  // Generate new OTP
  const newOtp = generateOtp();
  const newOtpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  // Update user with new OTP
  user.otp = newOtp;
  user.otpExpiry = newOtpExpiry;
  await user.save();

  await sendEmail(user.email, "Resend Email Verification OTP", "resend_otp", {
    Name: user.fullName || user.username,
    otp: newOtp, 
  });
  

  // Send response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "New OTP sent successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateUserAvatar,
  upgradeToPremium,
  updateUserProfile,
  changePassword,
  deleteAccount,
  onlyuploadImage,
  generateAccessAndRefreshToken,
  verifyEmailOtp,
  resendOtp
};
