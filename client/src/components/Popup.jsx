import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle, PencilRuler } from 'lucide-react';

const Popup = ({
  type,
  isOpen,
  onClose,
  onSubmit,
  className = '',
  children,
}) => {
  const [logoImage, setLogoImage] = useState(null);

  // Convert spaces to hyphens
  const convertToHyphenCase = (value) => {
    return value.replace(/\s+/g, '-');
  };

  // Website Details Form
  const {
    control: websiteControl, 
    handleSubmit: handleWebsiteSubmit, 
    formState: { errors: websiteErrors }, 
    reset: resetWebsiteForm,
    setValue: setWebsiteValue
  } = useForm({
    defaultValues: {
      websiteName: '',
      email: '',
    }
  });

  // Specification Form
  const {
    control: specControl, 
    handleSubmit: handleSpecSubmit, 
    formState: { errors: specErrors }, 
    reset: resetSpecForm 
  } = useForm({
    defaultValues: {
      specKey: '',
      specValue: '',
    }
  });

  // Handle logo file upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoImage(file);
    }
  };

  // Website Details Submission
  const onWebsiteSubmit = (data) => {
    if (logoImage) {
      onSubmit({
        websiteName: data.websiteName,
        websiteAuthorEmail: data.email,
        logoImage,
      });
      setLogoImage(null);
      resetWebsiteForm();
      onClose();
    }
  };

  // Specification Submission
  const onSpecSubmit = (data) => {
    onSubmit({ 
      key: data.specKey, 
      value: data.specValue 
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
        type: 'spring',
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold capitalize">
              {type === 'addWebsiteDetails'
                ? 'Add Website Details'
                : type === 'addSpecification'
                ? 'Add New Specification'
                : 'Popup'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>

          {/* Website Details Form */}
          {type === 'addWebsiteDetails' && (
            <form onSubmit={handleWebsiteSubmit(onWebsiteSubmit)} className="space-y-4">
              {/* Website Name Input */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Website Name *
                </label>
                <Controller
                  name="websiteName"
                  control={websiteControl}
                  rules={{ 
                    required: 'Website name is required',
                    pattern: {
                      value: /^[a-zA-Z0-9-]+$/,
                      message: 'Invalid website name (alphanumeric and hyphens only)'
                    }
                  }}
                  render={({ field: { onChange, value, ...field } }) => (
                    <input
                      {...field}
                      type="text"
                      value={value}
                      onChange={(e) => {
                        const hyphenatedValue = convertToHyphenCase(e.target.value);
                        onChange(hyphenatedValue);
                        setWebsiteValue('websiteName', hyphenatedValue);
                      }}
                      placeholder="Enter website name"
                      className={`w-full px-3 py-2 border rounded-md ${websiteErrors.websiteName ? 'border-red-500' : ''}`}
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
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="Enter email"
                      className={`w-full px-3 py-2 border rounded-md ${websiteErrors.email ? 'border-red-500' : ''}`}
                    />
                  )}
                />
                {websiteErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {websiteErrors.email.message}
                  </p>
                )}
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Logo Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className={`w-full px-3 py-2 border rounded-md ${!logoImage ? 'border-red-500' : ''}`}
                />
                {!logoImage && (
                  <p className="text-red-500 text-sm mt-1">
                    Logo image is required
                  </p>
                )}
                {logoImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Selected file: {logoImage.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Submission Buttons */}
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-grow bg-[#9333ea] text-white py-2 rounded-md hover:bg-[#5b2291]"
                >
                  <PencilRuler className="inline mr-3" size={24} />
                   CREATE WEBSITE
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

          {/* Specification Form */}
          {type === 'addSpecification' && (
            <form onSubmit={handleSpecSubmit(onSpecSubmit)} className="space-y-4">
              {/* Specification Key Input */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Specification Key *
                </label>
                <Controller
                  name="specKey"
                  control={specControl}
                  rules={{ 
                    required: 'Specification key is required',
                    minLength: {
                      value: 2,
                      message: 'Key must be at least 2 characters'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter specification key"
                      className={`w-full px-3 py-2 border rounded-md ${specErrors.specKey ? 'border-red-500' : ''}`}
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
                    required: 'Specification value is required',
                    minLength: {
                      value: 1,
                      message: 'Value must not be empty'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter specification value"
                      className={`w-full px-3 py-2 border rounded-md ${specErrors.specValue ? 'border-red-500' : ''}`}
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