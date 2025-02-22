// ImageUpload.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../features/websiteSlice";
import CircularLoader from "../../Loader/CircularLoader";

const ImageUpload = ({
  src,
  alt,
  className = "",
  onUpload,
  overlayClass = "",
  containerClass = "",
  editable,
  oldImageUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", file); // The key should match your backend (`upload.single("image")`)

    console.log(oldImageUrl);
    if (oldImageUrl) formData.append("url", oldImageUrl);

    try {
      const image = await dispatch(uploadImage(formData));
      if (image.payload) {
        const imageUrl = image.payload.data; // Assuming backend sends only URL
        console.log("Image URL:", imageUrl);
        onUpload(imageUrl, image);
        setIsLoading(false);
      } else {
        console.log("Image is not properly uploaded.");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleUploadClick = () => {
    if (editable) {
      // Create and trigger hidden file input
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = handleImageUpload;
      fileInput.click();
    }
    return;
  };

  return (
    <div
      className={`relative group cursor-pointer ${containerClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src} alt={alt} className={`object-cover ${className}`} />
      {editable && isHovered && !isLoading ? (
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${overlayClass}`}
        >
          <button
            className="z-20 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleUploadClick}
          >
            Upload Image
          </button>
        </div>
      ) : (
        isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
            <CircularLoader />
          </div>
        )
      )}
    </div>
  );
};

export default ImageUpload;
