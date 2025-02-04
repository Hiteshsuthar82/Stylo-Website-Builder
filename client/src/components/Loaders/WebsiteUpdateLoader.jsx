import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  RefreshCcw, 
  CheckCircle2, 
  DatabaseBackup, 
  Upload, 
  Sparkles 
} from 'lucide-react';

const WebsiteUpdateLoader = ({ 
  isOpen, 
  onClose, 
  websiteName, 
  updateType = 'update' // 'update' or 'redeploy'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const updateSteps = {
    update: [
      {
        title: 'Preparing Update',
        description: 'Gathering website configuration...',
        icon: DatabaseBackup,
        duration: 2500
      },
      {
        title: 'Updating Details',
        description: 'Applying changes to your website...',
        icon: RefreshCcw,
        duration: 2000
      },
      {
        title: 'Finalizing Changes',
        description: 'Syncing latest configurations...',
        icon: Server,
        duration: 1500
      }
    ],
    redeploy: [
      {
        title: 'Preparing Redeploy',
        description: 'Checking current website status...',
        icon: Server,
        duration: 2000
      },
      {
        title: 'Uploading Files',
        description: 'Transferring updated website files...',
        icon: Upload,
        duration: 2500
      },
      {
        title: 'Going Live',
        description: 'Activating new website version...',
        icon: Sparkles,
        duration: 1500
      }
    ]
  };

  const currentSteps = updateSteps[updateType] || updateSteps.update;

  useEffect(() => {
    if (isOpen) {
      let stepTimer;
      let progressTimer;

      // Reset states
      setCurrentStep(0);
      setProgress(0);

      // Simulate update/redeploy progress
      const simulateProcess = async () => {
        for (let i = 0; i < currentSteps.length; i++) {
          await new Promise(resolve => {
            stepTimer = setTimeout(() => {
              setCurrentStep(i);
              resolve();
            }, currentSteps[i].duration);
          });
        }
      };

      // Progress bar animation
      progressTimer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            clearInterval(progressTimer);
            // setTimeout(() => onClose(), 1000);
            return 100;
          }
          return newProgress;
        });
      }, 50);

      simulateProcess();

      return () => {
        clearTimeout(stepTimer);
        clearInterval(progressTimer);
      };
    }
  }, [isOpen, updateType]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
      >
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900">
            {updateType === 'update' ? 'Updating Website' : 'Redeploying Website'}
          </h2>
          <p className="text-sm text-gray-600 mt-1 truncate">{websiteName}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-0 h-full bg-purple-600 rounded-full"
          />
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-6">
          <AnimatePresence>
            {currentSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    isActive ? 'bg-purple-100' :
                    isCompleted ? 'bg-green-100' :
                    'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : isActive ? (
                      <StepIcon className="w-5 h-5 text-purple-600 animate-pulse" />
                    ) : (
                      <StepIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      isActive ? 'text-purple-900' :
                      isCompleted ? 'text-gray-900' :
                      'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      isActive ? 'text-purple-600' :
                      'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Loading Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center text-purple-600"
        >
          <RefreshCcw className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm font-medium">
            {Math.round(progress)}% Complete
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WebsiteUpdateLoader;