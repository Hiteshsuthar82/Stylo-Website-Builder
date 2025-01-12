import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
    deleteImageOnCloudinary,
    uploadPhotoOnCloudinary as uploadOnCloudinary,
  } from "../utils/cloudinary.js";

// 1>> registerUser 

  const registerUser = asyncHandler(async (req, res) => {
    
  
    // Getting the data from frontend
    let { username, password, fullName, email } = req.body;
    console.log("this is avtar",req.files)
  
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
  
    // checking if user is created successfully
  
    const userData = await User.findById(createdUser._id).select(
      "-password -refreshToken"
    );
  
    if (!userData) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    // Send back data to frontend
    return res
      .status(201)
      .json(new ApiResponse(200, userData, "Account Created Successfully"));
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

  
// currentuser

  const getCurrentUser = asyncHandler(async (req, res) => {
    return res
      .status(200)
      .json(new ApiResponse(201, req.user, "User fetched Successfully"));
  });

//  >> profileupdate

  const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, username } = req.body;
  
    if (!fullName && !email && !username) {
      throw new ApiError(400, "At least one field required");
    }
  
    const user = await User.findById(req.user?._id);
  
    if (fullName) user.fullName = fullName;
  
    if (email) user.email = email;
  
    
  
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

      console.log(req.cookies)
      
  
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
  


  export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    updateUserProfile,
    getCurrentUser,
    updateUserAvatar,
   
  };

