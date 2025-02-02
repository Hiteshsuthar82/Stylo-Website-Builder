import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteImageOnCloudinary,
  uploadPhotoOnCloudinary as uploadOnCloudinary,
} from "../utils/cloudinary.js";
import mongoose, { isValidObjectId } from "mongoose";
import { Portfolio } from "../models/portfolio.model.js";
import { User } from "../models/user.model.js";

export const createPortfolio = asyncHandler(async (req, res, next) => {
  const portfolioData = req.body;
  portfolioData.websiteowner = req.user._id;

  const isWebsiteAvailale = await Portfolio.findOne({websiteName: portfolioData?.websiteName})
  
  if (isWebsiteAvailale) {
    throw new ApiError(500, "This website name is already exists");
  }

  const portfolio = await Portfolio.create(portfolioData);
  console.log("portfolio created", portfolio);

  return res
    .status(201)
    .json(new ApiResponse(201, portfolio, "Portfolio created successfully"));
});

export const getPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.find({ websiteowner: req.user._id });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, portfolio, "Portfolio retrieved successfully"));
});

export const getPortfolioById = asyncHandler(async (req, res) => {
  const { portfolioId } = req.params;

  const portfolioDetails = await Portfolio.findOne({ _id: portfolioId });

  if (!portfolioDetails) {
    throw new ApiError(404, "Portfolio not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, portfolioDetails, "Portfolio details fetched successfully")
    );
});

export const deleteAllUserPortfolios = asyncHandler(async (req, res) => {
    const deletedPortfolios = await Portfolio.deleteMany({ 
      websiteowner: req.user._id 
    });
  
    if (deletedPortfolios.deletedCount === 0) {
      throw new ApiError(404, "No portfolios found to delete");
    }
  
    return res.status(200).json(
      new ApiResponse(
        200, 
        { deletedCount: deletedPortfolios.deletedCount }, 
        "All user portfolios deleted successfully"
      )
    );
  });
  
  export const deleteSpecificPortfolio = asyncHandler(async (req, res) => {
    const { portfolioId } = req.params;
    console.log("portfolioId", portfolioId);
  
    const deletedPortfolio = await Portfolio.findOneAndDelete({
      _id: portfolioId,
      websiteowner: req.user._id
    });
  
    if (!deletedPortfolio) {
      throw new ApiError(404, "Portfolio not found or unauthorized");
    }
  
    return res.status(200).json(
      new ApiResponse(
        200, 
        null, 
        "Portfolio deleted successfully"
      )
    );
  });

export const uploadPortfolioImage = asyncHandler(async (req, res) => {
  const { imageType, projectIndex } = req.body;
  const localFilePath = req.file?.path;

  if (!localFilePath) {
    throw new ApiError(400, "File is required");
  }

  const uploadedImage = await uploadOnCloudinary(localFilePath);

  if (!uploadedImage) {
    throw new ApiError(500, "Error uploading image");
  }

  const portfolio = await Portfolio.findOneAndUpdate(
    { websiteowner: req.user._id },
    imageType === 'projectImage' 
      ? { $set: { [`projects.items.${projectIndex}.image`]: uploadedImage.url } }
      : { $set: { 
          ...(imageType === 'logo' && { 'header.logoImg': uploadedImage.url }),
          ...(imageType === 'profileImage' && { 'hero.profileImage': uploadedImage.url }),
          ...(imageType === 'aboutImage' && { 'about.image': uploadedImage.url })
        } },
    { new: true }
  );

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200, 
      { 
        imageUrl: uploadedImage.url,
        portfolio: {
          headerLogoImg: portfolio.header.logoImg,
          heroProfileImage: portfolio.hero.profileImage,
          aboutImage: portfolio.about.image,
          projectImages: portfolio.projects.items.map(item => item.image)
        }
      }, 
      "Image uploaded successfully"
    )
  );
});



export const updatePortfoliobyid = asyncHandler(async (req, res) => {
    const { id } = req.params; // Extract the portfolio id from the request params
  
    // Find the portfolio by id and update it
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,          // Find by portfolio ID
      req.body,    // Update with the request body
      { new: true, runValidators: true } // Return the updated document and apply validation
    );
  
    // If no portfolio is found, throw a 404 error
    if (!updatedPortfolio) {
      throw new ApiError(404, "Portfolio not found");
    }
  
    // Return the updated portfolio
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedPortfolio, "Portfolio updated successfully")
      );
  });
  

// TODO: add in postman when you check uplaod iamge on portfolio
// {
  //   "imageType": "logo",
  //   "file": (multipart file upload)
  // }
  
  // TODO: add in postman when you check uplaod iamge on portfolio project with {index} 
  // {
  //   "imageType": "projectImage", 
  //   "projectIndex": 0,
  //   "file": (multipart file upload)
  // }



  export const deployWebsite = asyncHandler(async (req, res) => {
    const { id } = req.params; 
  
    // Find the portfolio by id and update it
    const websiteDetails = await Portfolio.findById(
      {id}
    );
  
    // If no portfolio is found, throw a 404 error
    if (!updatedPortfolio) {
      throw new ApiError(404, "website not found with specidied id");
    }
  
    // Return the updated portfolio
    return res
      .status(200)
      .json(
        new ApiResponse(200, websiteDetails, "website deployed successfully")
      );
  });