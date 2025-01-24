import React from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateTypeSelectionPage = () => {
  const navigate = useNavigate();
  const templateTypes = [
    { id: 1, name: 'Portfolio', icon: '💼', count: 24, type:"portfolio" },
    { id: 2, name: 'Interior Design', icon: '🏥', count: 2, type:"interiorDesign" },
    { id: 3, name: 'Product Showcase', icon: '🛒', count: 32, type:"productShowcase" },
    { id: 4, name: 'Grocery Shop', icon: '🛍️', count: 15, type:"groceryShop" },
    { id: 5, name: 'Agency', icon: '🏢', count: 28, type:"agency" },
    { id: 6, name: 'Education', icon: '🎓', count: 22, type:"education" },
    { id: 7, name: 'Photography', icon: '📸', count: 16, type:"photography" },
    { id: 8, name: 'Technology', icon: '💻', count: 26, type:"technology" },
    { id: 9, name: 'Art Gallery', icon: '🎨', count: 14, type:"artGallery" },
    { id: 10, name: 'Dashboard', icon: '📊', count: 20, type:"dashboard" },
    { id: 11, name: 'Hospital / Doctor', icon: '🏥', count: 18, type:"hospital" },
    { id: 12, name: 'E-Commerce', icon: '🛒', count: 32, type:"eCommerce" },
  ];

  const handleTemplateClick = (websiteType) => {
    // Add your navigation logic here
    console.log(`Navigating to ${websiteType} templates`);
    navigate(`/template-selection/${websiteType}`)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Website Category</h1>
        <p className="text-gray-600 text-lg">
          Browse through our collection of professional templates for every need
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templateTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleTemplateClick(type.type)}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200"
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">{type.icon}</span>
              </div>
              
              {/* Template Info */}
              <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
              <p className="text-gray-600">
                {type.count} Templates Available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateTypeSelectionPage;