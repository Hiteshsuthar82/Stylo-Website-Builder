import React from "react";

function ShowImagePopup({ src, isPopupVisible, isImageVisible, closePopup }) {
  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20 transition-opacity duration-300 ${
        isPopupVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={closePopup}
    >
      <div
        className={`relative transform transition-transform duration-300 ${
          isImageVisible ? "scale-100" : "scale-y-0"
        }`}
      >
        <img
          src={src}
          alt="Enlarged Template"
          className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
        />
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-white text-black rounded-full p-2 h-10 w-10"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ShowImagePopup;
