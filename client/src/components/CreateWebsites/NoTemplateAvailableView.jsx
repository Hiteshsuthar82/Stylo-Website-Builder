import React from "react";

const NoTemplateAvailableView = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-6 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5z"
              />
            </svg>
          </div>
        </div>
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Template Not Found
        </h1>
        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          The selected template ID doesn’t match any available designs. Please
          choose a valid template to continue.
        </p>
        {/* Action Button */}
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NoTemplateAvailableView;
