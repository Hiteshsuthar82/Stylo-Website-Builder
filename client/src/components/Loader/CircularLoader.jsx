import React from 'react';

const CircularLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default CircularLoader;