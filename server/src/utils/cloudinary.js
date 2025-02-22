import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPhotoOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    console.log("uploading thumbnail...");

    //Uploading File to Cloudinary
    const cldnry_res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "Resume_Builder/photos",
    });

    // File Uploaded Successfully & Removing File From Local System
    fs.unlinkSync(localFilePath);
    return cldnry_res;
  } catch (error) {
    fs.unlinkSync(localFilePath); //Removing File From Local System
    console.log("CLOUDINARY :: FILE UPLOAD ERROR ", error);
    return null;
  }
};


const deleteImageOnCloudinary = async (URL) => {
  try {
    if (!URL) {
      console.error("Invalid URL provided for deletion.");
      return false;
    }

    console.log("Cloudinary URL to delete:", URL);

    // Extract the filename from the Cloudinary URL
    const parts = URL.split("/");
    const filenameWithExtension = parts.pop(); // Get the last part (uzntu3k8fh9alx5kjmol.png)
    const filename = filenameWithExtension.split(".")[0]; // Remove .png, .jpg, etc.

    if (!filename) {
      console.error("Could not extract image ID from URL:", URL);
      return false;
    }

    console.log("Deleting image from Cloudinary:", filename);

    // Delete the image from Cloudinary
    const cldnry_res = await cloudinary.uploader.destroy(
      `Resume_Builder/photos/${filename}`,
      { resource_type: "image" }
    );

    return cldnry_res;
  } catch (error) {
    console.log("CLOUDINARY :: FILE Delete ERROR", error);
    return false;
  }
};




export {
  uploadPhotoOnCloudinary,
  deleteImageOnCloudinary,
  
};
