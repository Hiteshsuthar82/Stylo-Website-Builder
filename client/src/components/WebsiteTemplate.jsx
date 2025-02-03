import React, { useState } from 'react';
import { Eye, Edit, Trash2, Globe, FileCode, PlusCircle } from 'lucide-react';

const WebsiteTemplate = ({
  templateData,
  isSelected,
  name,
  onClick,
  onDemoClick,
  onUseTemplateClick,
  websiteId = null,
  websiteType = null,
  onEditClick,
  onDeleteClick,
  deployedUrl = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const StatusBadge = ({ deployed }) => (
    <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-sm font-medium ${
      deployed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    }`}>
      {deployed ? 'Live' : 'Draft'}
    </div>
  );

  return (
    <div
      onClick={() => onClick && onClick(templateData.id, websiteId, websiteType)}
      className={`relative bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl w-full max-w-sm mx-auto overflow-hidden ${
        isSelected ? 'ring-4 ring-purple-600' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status Badge */}
      <StatusBadge deployed={deployedUrl} />

      {/* Template Preview */}
      <div className="relative aspect-video">
        <img
          className="w-full h-full object-cover"
          src={templateData.src}
          alt={`template ${templateData.id}`}
        />
        
        {/* Overlay on hover */}
        {(isHovered || isSelected) && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-opacity">
            {onDemoClick && (
              <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDemoClick(templateData.id);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Eye size={18} />
                <span>Preview</span>
              </button>
              <button
              className="bg-purple-600 text-white flex gap-2 px-4 py-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => {
                onUseTemplateClick(templateData.id);
              }}

            >
              <PlusCircle size={24} color="white" /> Use This Template
            </button>
              </>
            )}
            {onEditClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(websiteId, websiteType, templateData.id);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                <Edit size={18} />
                <span>Edit</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {onDeleteClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(websiteId);
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* Template Details */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <FileCode size={16} />
            <span>{websiteType || 'Template'}</span>
          </div>
          {deployedUrl && (
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={16} />
              <span>Visit Site</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteTemplate;