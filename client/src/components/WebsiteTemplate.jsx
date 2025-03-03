import React, { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Globe,
  FileCode,
  PlusCircle,
  Send,
} from "lucide-react";
import CopyButton from "./Buttons/CopyButton";
import ShareButton from "./Buttons/ShareButton";
import { Crown } from "lucide-react";

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
  onGoLive,
  deployedUrl = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const StatusBadge = ({ deployed }) => (
    <div
      className={`px-4 rounded-full border ${
        deployed
          ? "bg-green-100 text-green-600"
          : "bg-orange-100 text-orange-600"
      }`}
    >
      {deployed ? "Live" : "Draft"}
    </div>
  );

  return (
    <div
      onClick={() =>
        onClick &&
        onClick(templateData.id, websiteId, websiteType, deployedUrl, name)
      }
      className={`relative bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl w-full max-w-sm mx-auto overflow-hidden ${
        isSelected ? "ring-4 ring-slate-800" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            {onDemoClick && onUseTemplateClick && (
              <div className="flex flex-col items-center gap-2">
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
                  className="bg-purple-600 flex gap-2 items-center px-5 py-2 text-white rounded-full hover:bg-purple-400 transition-colors"
                  onClick={(e) => {
                    onUseTemplateClick(templateData.id);
                  }}
                >
                  <PlusCircle size={18} color="white" /> Create
                </button>
              </div>
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

        {onDemoClick && onUseTemplateClick && templateData.premium && (
          <div className="absolute flex gap-2 top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg text-xs font-semibold">
            <Crown className="w-4 h-4 text-yellow-300" /> Premium
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            {/* Status Badge */}
            {(deployedUrl || onGoLive) && (
              <StatusBadge deployed={deployedUrl} />
              // Below is showing only draft lable not live lable
              // <span className="text-red-400  border  bg-red-100 rounded-full px-4">
              //   Draft
              // </span>
            )}
          </div>
          {onDeleteClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(websiteId, websiteType, name);
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* Template Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <FileCode size={16} />
            <span>{websiteType || "Template"}</span>
          </div>
          {deployedUrl ? (
            <div className="flex items-center justify-between flex-1">
              <a
                href={deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-purple-600 hover:text-purple-700"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe size={16} />
                <span>Visit Site</span>
              </a>
              <div className="flex items-center gap-2">
                <CopyButton deployedUrl={deployedUrl} />

                <ShareButton sharableUrl={deployedUrl} />
              </div>
            </div>
          ) : onGoLive ? (
            <div className="flex items-center justify-between flex-1">
              <a
                href={`/website-demo/${websiteType}/${templateData.id}?id=${websiteId}`}
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 gap-[2px]"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye size={18} /> <span>Open Preview</span>
              </a>
              {onGoLive && (
                <button
                  className="px-2 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  onClick={() => onGoLive(websiteId, websiteType, name)}
                >
                  Go Live
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteTemplate;
