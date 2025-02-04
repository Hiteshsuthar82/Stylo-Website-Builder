import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StyloLoader = ({ loading }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Design', 'Create', 'Build', 'Launch'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div 
          key="loader"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.2,
            transition: { 
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
          className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50"
        >
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6 space-x-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step}
                    animate={{ 
                      scale: activeStep === index ? [1, 1.2, 1] : 1,
                      opacity: activeStep === index ? [0.5, 1, 0.5] : 0.3
                    }}
                    transition={{ duration: 1, repeat: activeStep === index ? Infinity : 0 }}
                    className="w-16 h-1 bg-purple-500/50 rounded-full"
                  />
                ))}
              </div>

              <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
                STYLO
              </h1>

              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl text-purple-400 mb-6"
              >
                {steps[activeStep]} Websites
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StyloLoader;