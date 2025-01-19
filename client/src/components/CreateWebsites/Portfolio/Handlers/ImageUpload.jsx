// ImageUpload.js
import React, { useState } from 'react';

const ImageUpload = ({ 
  src, 
  alt, 
  className = "", 
  onUpload, 
  overlayClass = "",
  containerClass = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the selected image file
      const imageUrl = URL.createObjectURL(file);
      onUpload(imageUrl, file);
    }
  };

  const handleUploadClick = () => {
    // Create and trigger hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = handleImageUpload;
    fileInput.click();
  };

  return (
    <div 
      className={`relative group cursor-pointer ${containerClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleUploadClick}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
      />
      {isHovered && (
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${overlayClass}`}>
          <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;