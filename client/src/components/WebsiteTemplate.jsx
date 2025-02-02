import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import editIcon from "./../assets/edit-icon.svg";
import deleteIcon from "./../assets/delete-icon.svg";
import { Eye, Edit, Trash2, PlusCircle } from 'lucide-react';

function WebsiteTemplate({
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
}) {  
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onClick={() => onClick && onClick(templateData.id, websiteId, websiteType)}
      className={`relative mx-auto p-1 rounded-lg cursor-pointer transition-all duration-300 border-4 w-fit h-full group ${
        isSelected
          ? "border-4 border-purple-600"
          : "border-2 border-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name && (
        <div className="text-center border-2 rounded-t-xl border-purple-600 mb-2">
          {name}
        </div>
      )}
      <img
        className="w-full object-contain rounded-lg shadow-lg focus:outline-none"
        src={templateData.src}
        alt={`template ${templateData.id}`}
        tabIndex={0}
      />

      {/* Icon to be displayed on hover/focus */}
      {
        onDemoClick && onUseTemplateClick && (isHovered || isSelected) ? (
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-3 items-center justify-center transition-opacity rounded-lg`}
          >
            <button
              className="bg-gray-300 text-black flex gap-2 px-4 py-2 rounded-full hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => {
                onDemoClick(templateData.id);
              }}
            >
              <Eye size={24} color="black" /> Website Demo
            </button>
            <button
              className="bg-purple-600 text-white flex gap-2 px-4 py-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => {
                onUseTemplateClick(templateData.id);
              }}
            >
              <PlusCircle size={24} color="white" /> Use This Template
            </button>
          </div>
        ) : (
          ""
        )
        // <div
        //   className="absolute top-4 right-8 w-10 h-10 bg-purple-600 p-2 rounded-full flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        //   onClick={(e) => {
        //     onDemoClick(templateData.id);
        //   }}
        //   title="Demo Website"
        // >
        //   {/* <img src={searchIcon} alt="" /> */}
        //   <IoEyeSharp size={24} color="white" />
        // </div>
      }
      {onEditClick && (
        <div
          className="absolute top-4 right-16 w-10 h-10 bg-purple-600 p-2 rounded-full flex items-center justify-center opacity-0 transition-opacity group-focus-within:opacity-100"
          onClick={(e) => {
            onEditClick(websiteId);
          }}
        >
          <img src={editIcon} alt="" />
        </div>
      )}
      {onDeleteClick && (
        <div
          className="absolute top-4 right-4 w-10 h-10 bg-orange-300 p-2 rounded-full flex items-center justify-center opacity-0 transition-opacity group-focus-within:opacity-100"
          onClick={(e) => {
            onDeleteClick(websiteId);
          }}
        >
          <img src={deleteIcon} alt="" />
        </div>
      )}
    </div>
  );
}

export default WebsiteTemplate;
