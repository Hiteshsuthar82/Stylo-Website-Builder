import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlusCircle, PencilRuler, Info, Radio } from "lucide-react";

const Popup = ({
  type,
  isOpen,
  onClose,
  onSubmit,
  className = "",
  children,
  WebsiteData,
  editing,
}) => {
  const [logoImage, setLogoImage] = useState(WebsiteData?.header?.logoImage);
  const [logoType, setLogoType] = useState("text");
  const [logoText, setLogoText] = useState(WebsiteData?.header?.logoText);

  // Website Details Form
  const {
    control: websiteControl,
    handleSubmit: handleWebsiteSubmit,
    formState: { errors: websiteErrors },
    reset: resetWebsiteForm,
    setValue: setWebsiteValue,
  } = useForm({
    defaultValues: {
      websiteName: WebsiteData ? WebsiteData?.websiteName : "",
      email: WebsiteData ? WebsiteData?.websiteAuthorEmail : "",
    },
  });

  // Specification Form
  const {
    control: specControl,
    handleSubmit: handleSpecSubmit,
    formState: { errors: specErrors },
    reset: resetSpecForm,
  } = useForm({
    defaultValues: {
      specKey: "",
      specValue: "",
    },
  });

  // Logo Type Selection Form
  const {
    control: logoControl,
    handleSubmit: handleLogoSubmit,
    reset: resetLogoForm,
  } = useForm();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file); // Generate local URL
      setLogoImage(localUrl); // Store the local URL
    }
  };

  // Logo Type Submission
  const onLogoTypeSubmit = () => {
    if (
      (logoType === "text" && !logoText) ||
      (logoType === "image" && !logoImage) ||
      !logoType
    )
      return;
    onSubmit({
      logoType,
      ...(logoType === "text" && { logoText }),
      ...(logoType === "image" && { logoImage }),
    });
    resetLogoForm();
    onClose();
  };

  // Website Details Submission
  const onWebsiteSubmit = (data, actionType) => {
    onSubmit({
      websiteName: data.websiteName,
      websiteAuthorEmail: data.email,
    }, actionType);
  };

  // Specification Submission
  const onSpecSubmit = (data) => {
    onSubmit({
      key: data.specKey,
      value: data.specValue,
    });
    resetSpecForm();
    onClose();
  };

  // Framer Motion animation variants
  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  // Don't render if popup is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          key="popup"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`bg-white rounded-xl shadow-2xl p-6 w-full max-w-md ${className}`}
        >
          {/* Popup Header */}
          <div className={`flex justify-between items-center mb-4`}>
            <div
              className={` flex${
                type === "logoTypeSelection" ? "flex-col" : "flex-row"
              }`}
            >
              <h2 className="text-xl font-semibold capitalize">
                {type === "addWebsiteDetails"
                  ? editing
                    ? "Change Website Details"
                    : "Add Website Details"
                  : type === "addSpecification"
                  ? "Add New Specification"
                  : type === "logoTypeSelection"
                  ? "Select Logo Type"
                  : "Popup"}
              </h2>
              {type === "logoTypeSelection" && (
                <p className="text-gray-500">
                  You can also continue with default logo
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>

          {/* Logo Type Selection Form */}
          {type === "logoTypeSelection" && (
            <div className="space-y-4">
              {/* Logo Type Selection */}
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  onClick={() => setLogoType("text")}
                  className={`px-4 py-2 rounded-md ${
                    logoType === "text"
                      ? "bg-[#9333ea] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setLogoType("image")}
                  className={`px-4 py-2 rounded-md ${
                    logoType === "image"
                      ? "bg-[#9333ea] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Image
                </button>
              </div>

              {/* Logo Preview/Input */}
              {logoType === "text" && (
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Enter Logo Text (optional to change)
                  </label>
                  <input
                    type="text"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    placeholder="Enter logo text"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {!logoText && (
                    <p className="text-red-500 text-sm mt-1">
                      Logo text is required
                    </p>
                  )}
                  {logoText && (
                    <div className="mt-2 p-2 bg-gray-100 rounded-md text-center">
                      <h1 className="text-2xl font-bold text-gray-800">
                        {logoText}
                      </h1>
                    </div>
                  )}
                </div>
              )}

              {logoType === "image" && (
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Upload Logo Image (optional to change)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {logoImage && (
                    <div className="mt-2">
                      <img
                        src={logoImage}
                        alt="Logo Preview"
                        className="mt-2 max-h-40 mx-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Info */}
              <div className="text-blue-700 flex gap-3 items-center bg-blue-100 px-2 py-1 rounded-md">
                <Info size={20} /> You can also change logo while creating
                website
              </div>

              {/* Submission Buttons */}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={onLogoTypeSubmit}
                  className="flex-grow bg-[#9333ea] text-white py-2 rounded-md hover:bg-[#5b2291]"
                >
                  <PlusCircle className="inline mr-2" size={20} />
                  Confirm Logo
                </button>
              </div>
            </div>
          )}

          {/* Website Details Form */}
          {type === "addWebsiteDetails" && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              {/* Website Name Input */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Website Name *
                </label>
                <Controller
                  name="websiteName"
                  control={websiteControl}
                  rules={{
                    required: "Website name is required",
                  }}
                  render={({ field: { onChange, value, ...field } }) => (
                    <input
                      {...field}
                      type="text"
                      value={value}
                      onChange={(e) => {
                        setWebsiteValue("websiteName", e.target.value);
                      }}
                      placeholder="Enter website name"
                      className={`w-full px-3 py-2 border rounded-md ${
                        websiteErrors.websiteName ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {websiteErrors.websiteName && (
                  <p className="text-red-500 text-sm mt-1">
                    {websiteErrors.websiteName.message}
                  </p>
                )}
              </div>

              {/* Author Email Input */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Author Email *
                </label>
                <Controller
                  name="email"
                  control={websiteControl}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="Enter email"
                      className={`w-full px-3 py-2 border rounded-md ${
                        websiteErrors.email ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {websiteErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {websiteErrors.email.message}
                  </p>
                )}
              </div>

              {/* Submission Buttons */}
              <div className="flex space-x-2">
                <button
                  type="submit"
                  onClick={() => handleWebsiteSubmit((data) => onWebsiteSubmit(data, "draft"))()}
                  className="flex-grow bg-[#9333ea] text-white py-2 rounded-md hover:bg-[#5b2291]"
                >
                  <PencilRuler className="inline mr-3" size={24} />
                  {editing ? "UPDATE WEBSITE" : "SAVE AS DRAFT"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  onClick={() => handleWebsiteSubmit((data) => onWebsiteSubmit(data, "publish"))()}
                  className="flex-grow bg-[#9333ea] text-white py-2 rounded-md hover:bg-[#5b2291]"
                >
                  <Radio className="inline mr-3" size={24} />
                  {editing ? "UPDATE WEBSITE" : "PUBLISH WEBSITE"}
                </button>
              </div>
            </form>
          )}

          {/* Specification Form */}
          {type === "addSpecification" && (
            <form
              onSubmit={handleSpecSubmit(onSpecSubmit)}
              className="space-y-4"
            >
              {/* Specification Key Input */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Specification Key *
                </label>
                <Controller
                  name="specKey"
                  control={specControl}
                  rules={{
                    required: "Specification key is required",
                    minLength: {
                      value: 2,
                      message: "Key must be at least 2 characters",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter specification key"
                      className={`w-full px-3 py-2 border rounded-md ${
                        specErrors.specKey ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {specErrors.specKey && (
                  <p className="text-red-500 text-sm mt-1">
                    {specErrors.specKey.message}
                  </p>
                )}
              </div>

              {/* Specification Value Input */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Specification Value *
                </label>
                <Controller
                  name="specValue"
                  control={specControl}
                  rules={{
                    required: "Specification value is required",
                    minLength: {
                      value: 1,
                      message: "Value must not be empty",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter specification value"
                      className={`w-full px-3 py-2 border rounded-md ${
                        specErrors.specValue ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {specErrors.specValue && (
                  <p className="text-red-500 text-sm mt-1">
                    {specErrors.specValue.message}
                  </p>
                )}
              </div>

              {/* Submission Buttons */}
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-grow bg-[#9333ea] text-white py-2 rounded-md hover:bg-[#5b2291]"
                >
                  <PlusCircle className="inline mr-2" size={20} />
                  Add Specification
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Popup;
