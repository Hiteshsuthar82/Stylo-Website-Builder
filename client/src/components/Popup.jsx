import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle } from 'lucide-react';

const Popup = ({ 
  type, 
  isOpen, 
  onClose, 
  onSubmit, 
  className = '', 
  children 
}) => {
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  const handleSpecificationSubmit = () => {
    if (specKey && specValue) {
      onSubmit({ key: specKey, value: specValue });
      setSpecKey('');
      setSpecValue('');
      onClose();
    }
  };

  const popupVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: 50,
      transition: { duration: 0.2 }
    }
  };

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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold capitalize">
              {type === 'addSpecification' ? 'Add New Specification' : 'Popup'}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>

          {type === 'addSpecification' && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Specification Key
                </label>
                <input
                  type="text"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  placeholder="Enter specification key"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Specification Value
                </label>
                <input
                  type="text"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  placeholder="Enter specification value"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSpecificationSubmit}
                  className="flex-grow bg-[#9333ea] text-white py-2 rounded-md hover:bg-[#5b2291]"
                >
                  <PlusCircle className="inline mr-2" size={20} /> Add Specification
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Popup;