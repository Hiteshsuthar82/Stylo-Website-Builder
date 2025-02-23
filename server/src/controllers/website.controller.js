import { interiorDesign } from "../models/interiorDesign.model.js";
import { Portfolio } from "../models/portfolio.model.js";
import { productShowcase } from "../models/productShowcase.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteImageOnCloudinary,
  uploadPhotoOnCloudinary as uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import ejs from "ejs";
import nodemailer from "nodemailer";

// GitHub Configuration
const GITHUB_USERNAME = "Stylo-Website-Builder";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// Map website types to their respective models
const websiteModels = {
  portfolio: Portfolio,
  interiorDesign: interiorDesign,
  productShowcase: productShowcase,
  // Add more website types and their models here
};

export const createWebsite = asyncHandler(async (req, res) => {
  const { type, ...websiteData } = req.body;
  websiteData.websiteowner = req.user._id;
  const websiteType = type;
  console.log(websiteType, websiteData);

  const Model = websiteModels[websiteType];
  if (!Model) {
    throw new ApiError(400, "Invalid website type");
  }

  const isWebsiteAvailable = await Model.findOne({
    websiteName: websiteData?.websiteName,
  });

  if (isWebsiteAvailable) {
    throw new ApiError(500, "This website name already exists");
  }

  const website = await Model.create(websiteData);

  return res
    .status(201)
    .json(new ApiResponse(201, website, "Website created successfully"));
});

export const getAllWebsites = asyncHandler(async (req, res) => {
  const websiteTypes = Object.keys(websiteModels);
  const websites = {};

  for (const type of websiteTypes) {
    const Model = websiteModels[type];
    const websitesByType = await Model.find({ websiteowner: req.user._id });
    websites[type] = websitesByType;
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, websites, "All websites retrieved successfully")
    );
});

export const getWebsiteById = asyncHandler(async (req, res) => {
  const { websiteType, websiteId } = req.params;
  const Model = websiteModels[websiteType];

  if (!Model) {
    throw new ApiError(400, "Invalid website type");
  }

  const website = await Model.findOne({ _id: websiteId });

  if (!website) {
    throw new ApiError(404, "Website not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, website, "Website details fetched successfully")
    );
});

export const deleteAllWebsites = asyncHandler(async (req, res) => {
  const { websiteType } = req.params;
  const Model = websiteModels[websiteType];

  if (!Model) {
    throw new ApiError(400, "Invalid website type");
  }

  const deletedWebsites = await Model.deleteMany({
    websiteowner: req.user._id,
  });

  if (deletedWebsites.deletedCount === 0) {
    throw new ApiError(404, "No websites found to delete");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCount: deletedWebsites.deletedCount },
        "All websites deleted successfully"
      )
    );
});

export const deleteSpecificWebsite = asyncHandler(async (req, res) => {
  const { websiteType, id } = req.params;
  const Model = websiteModels[websiteType];

  if (!Model) {
    throw new ApiError(400, "Invalid website type");
  }

  const website = await Model.findOne({
    _id: id,
    websiteowner: req.user._id,
  });

  if (!website) {
    throw new ApiError(404, "Website not found or unauthorized");
  }

  if (website.repoName) {
    try {
      await octokit.repos.delete({
        owner: GITHUB_USERNAME,
        repo: website.repoName,
      });
    } catch (error) {
      console.error("Error deleting GitHub repository:", error);
    }
  }

  await Model.findOneAndDelete({
    _id: id,
    websiteowner: req.user._id,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        `Website ${website?.repoName ? "and associated repository " : ""}deleted successfully`
      )
    );
});

export const uploadWebsiteImage = asyncHandler(async (req, res) => {
  const { websiteType, imageType, projectIndex } = req.body;
  const Model = websiteModels[websiteType];

  if (!Model) {
    throw new ApiError(400, "Invalid website type");
  }

  const localFilePath = req.file?.path;

  if (!localFilePath) {
    throw new ApiError(400, "File is required");
  }

  const uploadedImage = await uploadOnCloudinary(localFilePath);

  if (!uploadedImage) {
    throw new ApiError(500, "Error uploading image");
  }

  const website = await Model.findOneAndUpdate(
    { websiteowner: req.user._id },
    getImageUpdateQuery(imageType, projectIndex, uploadedImage.url),
    { new: true }
  );

  if (!website) {
    throw new ApiError(404, "Website not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        imageUrl: uploadedImage.url,
        website: getWebsiteImageResponse(website),
      },
      "Image uploaded successfully"
    )
  );
});

export const updateWebsite = asyncHandler(async (req, res) => {
  const { websiteType, id } = req.params;
  const Model = websiteModels[websiteType];

  if (!Model) {
    throw new ApiError(400, "Invalid website type");
  }

  const updatedWebsite = await Model.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedWebsite) {
    throw new ApiError(404, "Website not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedWebsite, "Website updated successfully"));
});

export const deployWebsite = asyncHandler(async (req, res) => {
  const { websiteType, id } = req.params;
  const Model = websiteModels[websiteType];

  if (!Model) {
    throw new ApiError(400, "Invalid website type");
  }

  const websiteDetails = await Model.findById(id);
  if (!websiteDetails) {
    throw new ApiError(404, "Website not found");
  }

  const deployedUrl = await handleWebsiteDeployment(websiteDetails);

  await Model.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        deployedUrl,
        repoName: getRepoName(websiteDetails.websiteName),
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { deployedUrl }, "Website deployed successfully")
    );
});

export const reDeployWebsite = asyncHandler(async (req, res) => {
  const { websiteType, id } = req.params;
  const Model = websiteModels[websiteType];

  if (!Model) {
    throw new ApiError(400, "Invalid website type");
  }

  const websiteDetails = await Model.findById(id);
  if (!websiteDetails) {
    throw new ApiError(404, "Website not found");
  }

  const updatedData = await handleWebsiteRedeployment(websiteDetails);

  await Model.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        repoName: updatedData.repoName,
        deployedUrl: updatedData.deployedUrl,
        repoName:
          websiteDetails.repoName || getRepoName(websiteDetails.websiteName),
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deployedUrl: updatedData.deployedUrl },
        "Website redeployed successfully"
      )
    );
});

// send mail
export const sendMail = asyncHandler(async (req, res) => {
  const { websiteType, id } = req.params;
  const { name, email, contactNo, message } = req.body;

  if (!name || !email || !contactNo || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Get the correct model dynamically
    const Model = websiteModels[websiteType];

    if (!Model) {
      return res.status(400).json({ error: "Invalid website type" });
    }

    // Fetch website details from the corresponding model
    const website = await Model.findById(id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    const websiteAuthorEmail = website.websiteAuthorEmail; // Assuming websiteAuthorEmail exists in your model

    // Set up the email transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Email options
    let mailOptions = {
      from: `"Stylo Website Builder" <${process.env.EMAIL_USER}>`,
      to: websiteAuthorEmail,
      subject: `New Inquiry from ${name}`,
      text: `You have received a new inquiry from your website:

          Name: ${name}
          Email: ${email}
          Contact No: ${contactNo}
          Message: ${message}

          Best Regards,
          Your Website`,
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: `Email sent successfully to ${websiteAuthorEmail}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// upload image
export const onlyuploadImage = asyncHandler(async (req, res) => {
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
    const res = await deleteImageOnCloudinary(url);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, avatarImg.url, "Image uploaded successfully"));
});

// Helper functions
function getImageUpdateQuery(imageType, projectIndex, imageUrl) {
  if (imageType === "projectImage") {
    return {
      $set: { [`projects.items.${projectIndex}.image`]: imageUrl },
    };
  }

  const imageMapping = {
    logo: "header.logoImg",
    profileImage: "hero.profileImage",
    aboutImage: "about.image",
  };

  return {
    $set: { [imageMapping[imageType]]: imageUrl },
  };
}

function getWebsiteImageResponse(website) {
  return {
    headerLogoImg: website.header?.logoImg,
    heroProfileImage: website.hero?.profileImage,
    aboutImage: website.about?.image,
    projectImages: website.projects?.items?.map((item) => item.image) || [],
  };
}

function getRepoName(websiteName) {
  return websiteName.toLowerCase().replace(/\s+/g, "-");
}

async function handleWebsiteDeployment(websiteDetails) {
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
  let repoName = getRepoName(websiteName);
  let isRepoAvailable = true;
  let attempt = 0;

  while (isRepoAvailable) {
    try {
      await octokit.repos.get({ owner: GITHUB_USERNAME, repo: repoName });
      repoName = `${getRepoName(websiteName)}-${Math.floor(Math.random() * 1000)}`;
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

  console.log(
    GITHUB_USERNAME,
    repoName,
    filePath,
    encodedContent,
    websiteAuthorEmail
  );

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
  return deployedUrl;
}

async function handleWebsiteRedeployment(websiteDetails) {
  const { websiteName, type, templateId, websiteAuthorEmail, repoName } =
    websiteDetails;

  let repositoryName = repoName || getRepoName(websiteName); // Get the repoName from the portfolio data

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
    await octokit.repos.get({ owner: GITHUB_USERNAME, repo: repositoryName });
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
        repo: repositoryName,
        path: "index.html",
      });

      const sha = fileContent.data.sha; // Get the sha to delete the file

      await octokit.repos.deleteFile({
        owner: GITHUB_USERNAME,
        repo: repositoryName,
        path: "index.html",
        message: "Deleting old HTML file before redeployment",
        sha: sha,
      });
    } catch (error) {
      console.error("Error deleting previous HTML file:", error);
    }
  } else {
    // Repo doesn't exist, create new repo
    try {
      await octokit.repos.createForAuthenticatedUser({
        name: repositoryName,
        private: false,
      });
    } catch (error) {
      console.log("error when creating github repo on redploy", error);

      throw new ApiError(500, "Failed to create GitHub repository");
    }
  }

  // 6️⃣ Push the newly generated HTML file to GitHub repo
  const filePath = "index.html";
  const encodedContent = Buffer.from(renderedHtml).toString("base64");

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_USERNAME,
      repo: repositoryName,
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
  if (!repoExists) {
    try {
      await octokit.repos.update({
        owner: GITHUB_USERNAME,
        repo: repositoryName,
        has_pages: true,
        homepage: `https://${GITHUB_USERNAME}.github.io/${repositoryName}/`,
      });

      await octokit.repos.createPagesSite({
        owner: GITHUB_USERNAME,
        repo: repositoryName,
        source: {
          branch: "main",
          path: "/",
        },
      });
    } catch (error) {
      throw new ApiError(500, "Failed to enable GitHub Pages");
    }
  }

  // 8️⃣ Update the Portfolio document with the deployed URL and repositoryName
  const newDetails = {
    repoName: repositoryName,
    deployedUrl: `https://${GITHUB_USERNAME}.github.io/${repositoryName}/`,
  };

  return newDetails;
}
