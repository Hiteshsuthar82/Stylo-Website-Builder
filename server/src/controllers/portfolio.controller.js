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

// for deploy website
import { Octokit } from "@octokit/rest";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url"; 



// Define __filename and __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// GitHub Configuration
const GITHUB_USERNAME = "Stylo-Website-Builder";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API_URL = "https://api.github.com";

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});



export const createPortfolio = asyncHandler(async (req, res, next) => {
  const portfolioData = req.body;
  portfolioData.websiteowner = req.user._id;

  const isWebsiteAvailale = await Portfolio.findOne({
    websiteName: portfolioData?.websiteName,
  });

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
      new ApiResponse(
        200,
        portfolioDetails,
        "Portfolio details fetched successfully"
      )
    );
});

export const deleteAllUserPortfolios = asyncHandler(async (req, res) => {
  const deletedPortfolios = await Portfolio.deleteMany({
    websiteowner: req.user._id,
  });

  if (deletedPortfolios.deletedCount === 0) {
    throw new ApiError(404, "No portfolios found to delete");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCount: deletedPortfolios.deletedCount },
        "All user portfolios deleted successfully"
      )
    );
});

export const deleteSpecificPortfolio = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  // Find the portfolio in the database
  const portfolio = await Portfolio.findOne({
    _id: id,
    websiteowner: req.user._id,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found or unauthorized");
  }

  // Get the repoName from the portfolio data
  const { repoName } = portfolio;

  // If the repoName exists, attempt to delete it from GitHub
  if (repoName) {
    try {
      // Call the GitHub API to delete the repository
      await octokit.repos.delete({
        owner: GITHUB_USERNAME,
        repo: repoName,
      });
      console.log(`Repository ${repoName} deleted successfully`);
    } catch (error) {
      console.error("Error deleting GitHub repository:", error);
      // Handle the error if repository deletion fails (e.g., repository might not exist)
    }
  }

  // Delete the portfolio from the database
  const deletedPortfolio = await Portfolio.findOneAndDelete({
    _id: id,
    websiteowner: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Portfolio and associated repository deleted successfully"));
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
    imageType === "projectImage"
      ? {
          $set: { [`projects.items.${projectIndex}.image`]: uploadedImage.url },
        }
      : {
          $set: {
            ...(imageType === "logo" && {
              "header.logoImg": uploadedImage.url,
            }),
            ...(imageType === "profileImage" && {
              "hero.profileImage": uploadedImage.url,
            }),
            ...(imageType === "aboutImage" && {
              "about.image": uploadedImage.url,
            }),
          },
        },
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
          projectImages: portfolio.projects.items.map((item) => item.image),
        },
      },
      "Image uploaded successfully"
    )
  );
});

export const updatePortfoliobyid = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract the portfolio id from the request params

  // Find the portfolio by id and update it
  const updatedPortfolio = await Portfolio.findByIdAndUpdate(
    id, // Find by portfolio ID
    req.body, // Update with the request body
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
  console.log("id", id);
  

  // 1️⃣ Fetch website details from MongoDB
  const websiteDetails = await Portfolio.findById(id);
  console.log("websiteDetails", websiteDetails);
  
  if (!websiteDetails) {
    throw new ApiError(404, "Website not found with specified ID");
  }

  const { websiteName, type, templateId, websiteAuthorEmail } = websiteDetails;

  // 2️⃣ Fetch EJS template from GitHub
  const templateUrl = `https://raw.githubusercontent.com/Stylo-Website-Builder/Website-Templates/main/${type}/${templateId}.ejs`;
  let ejsTemplate;
  
  try {
    const response = await axios.get(templateUrl);
    ejsTemplate = response.data;
  } catch (error) {
    throw new ApiError(500, "Template file not found on GitHub");
  }

  // 3️⃣ Render HTML from EJS
  const renderedHtml = ejs.render(ejsTemplate, websiteDetails);

  // 4️⃣ Check if repository name exists, if yes, add a random number
  let repoName = websiteName.toLowerCase().replace(/\s+/g, "-");
  let isRepoAvailable = true;
  let attempt = 0;

  while (isRepoAvailable) {
    try {
      await octokit.repos.get({ owner: GITHUB_USERNAME, repo: repoName });
      repoName = `${websiteName}-${Math.floor(Math.random() * 1000)}`;
      attempt++;
    } catch (error) {
      isRepoAvailable = false;
    }
  }

  // 5️⃣ Create a new GitHub repository
  try {
    await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      private: false,
    });
  } catch (error) {
    throw new ApiError(500, "Failed to create GitHub repository");
  }

  // 6️⃣ Push HTML file to GitHub repo
  const filePath = "index.html";
  const encodedContent = Buffer.from(renderedHtml).toString("base64");

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_USERNAME,
      repo: repoName,
      path: filePath,
      message: "Initial commit",
      content: encodedContent,
      committer: {
        name: "Auto Deploy Bot",
        email: websiteAuthorEmail,
      },
      author: {
        name: "Auto Deploy Bot",
        email: websiteAuthorEmail,
      },
    });
  } catch (error) {
    throw new ApiError(500, "Failed to push HTML file to GitHub repository");
  }

  // 7️⃣ Enable GitHub Pages for deployment
  try {
    await octokit.repos.update({
      owner: GITHUB_USERNAME,
      repo: repoName,
      has_pages: true,
      homepage: `https://${GITHUB_USERNAME}.github.io/${repoName}/`,
    });

    await octokit.repos.createPagesSite({
      owner: GITHUB_USERNAME,
      repo: repoName,
      source: {
        branch: "main",
        path: "/",
      },
    });
  } catch (error) {
    throw new ApiError(500, "Failed to enable GitHub Pages");
  }

  const deployedUrl = `https://${GITHUB_USERNAME}.github.io/${repoName}/`;

  await Portfolio.findOneAndUpdate(
    { _id: id }, // Find document by _id
    { $set: { deployedUrl: deployedUrl, repoName: repoName } }, // Update field
    { new: true } // Return the updated document
  );

  // 8️⃣ Return the deployed URL
  return res
    .status(200)
    .json(new ApiResponse(200, { deployedUrl }, "Website deployed successfully"));
});


export const reDeployWebsite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 1️⃣ Fetch website details from MongoDB
  const websiteDetails = await Portfolio.findById(id);
  if (!websiteDetails) {
    throw new ApiError(404, "Website not found with specified ID");
  }

  const { websiteName, type, templateId, websiteAuthorEmail, deployedUrl, repoName } = websiteDetails;

  // 2️⃣ Fetch EJS template from GitHub
  const templateUrl = `https://raw.githubusercontent.com/Stylo-Website-Builder/Website-Templates/main/${type}/${templateId}.ejs`;
  let ejsTemplate;
  
  try {
    const response = await axios.get(templateUrl);
    ejsTemplate = response.data;
  } catch (error) {
    throw new ApiError(500, "Template file not found on GitHub");
  }

  // 3️⃣ Render HTML from EJS
  const renderedHtml = ejs.render(ejsTemplate, websiteDetails);

  // 4️⃣ Check if repo exists in GitHub
  let repoExists = false;
  try {
    await octokit.repos.get({ owner: GITHUB_USERNAME, repo: repoName });
    repoExists = true; // Repo exists
  } catch (error) {
    repoExists = false; // Repo doesn't exist
  }

  // 5️⃣ Handle Repo Deletion and Creation
  if (repoExists) {
    // Repo exists, delete old HTML file
    try {
      const fileContent = await octokit.repos.getContent({
        owner: GITHUB_USERNAME,
        repo: repoName,
        path: 'index.html',
      });
      
      const sha = fileContent.data.sha; // Get the sha to delete the file
      
      await octokit.repos.deleteFile({
        owner: GITHUB_USERNAME,
        repo: repoName,
        path: 'index.html',
        message: 'Deleting old HTML file before redeployment',
        sha: sha,
      });
    } catch (error) {
      console.error("Error deleting previous HTML file:", error);
    }
  } else {
    // Repo doesn't exist, create new repo
    try {
      await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        private: false,
      });
    } catch (error) {
      throw new ApiError(500, "Failed to create GitHub repository");
    }
  }

  // 6️⃣ Push the newly generated HTML file to GitHub repo
  const filePath = "index.html";
  const encodedContent = Buffer.from(renderedHtml).toString("base64");

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_USERNAME,
      repo: repoName,
      path: filePath,
      message: "Re-deploy website",
      content: encodedContent,
      committer: {
        name: "Auto Deploy Bot",
        email: websiteAuthorEmail,
      },
      author: {
        name: "Auto Deploy Bot",
        email: websiteAuthorEmail,
      },
    });
  } catch (error) {
    throw new ApiError(500, "Failed to push HTML file to GitHub repository");
  }

  // 7️⃣ Enable GitHub Pages for deployment
  if(!repoExists){
  try {
    await octokit.repos.update({
      owner: GITHUB_USERNAME,
      repo: repoName,
      has_pages: true,
      homepage: `https://${GITHUB_USERNAME}.github.io/${repoName}/`,
    });

    await octokit.repos.createPagesSite({
      owner: GITHUB_USERNAME,
      repo: repoName,
      source: {
        branch: "main",
        path: "/",
      },
    });
  } catch (error) {
    throw new ApiError(500, "Failed to enable GitHub Pages");
  }}

  // 8️⃣ Update the Portfolio document with the deployed URL and repoName
  const deployedUrlNew = `https://${GITHUB_USERNAME}.github.io/${repoName}/`;

  await Portfolio.findOneAndUpdate(
    { _id: id },
    { $set: { deployedUrl: deployedUrlNew, repoName: repoName } },
    { new: true }
  );

  // 9️⃣ Return the new deployed URL
  return res.status(200).json(new ApiResponse(200, { deployedUrl: deployedUrlNew }, "Website redeployed successfully"));
});


