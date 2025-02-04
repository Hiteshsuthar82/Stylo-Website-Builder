import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, Globe, Upload } from 'lucide-react';

const DeploymentLoading = ({ isOpen, onClose, websiteName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const deploymentSteps = [
    {
      title: 'Uploading Files',
      description: 'Transferring your website files to server...',
      icon: Upload,
      duration: 3000,
    },
    {
      title: 'Finalizing Deployment',
      description: 'Making your website live...',
      icon: Globe,
      duration: 2000,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      let timer;
      let progressTimer;

      // Reset states when opening
      setCurrentStep(0);
      setProgress(0);

      // Simulate deployment progress
      const simulateDeployment = async () => {
        for (let i = 0; i < deploymentSteps.length; i++) {
          await new Promise(resolve => {
            timer = setTimeout(() => {
              setCurrentStep(i);
              resolve();
            }, deploymentSteps[i].duration);
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

      simulateDeployment();

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Deploying Website</h2>
          <p className="text-sm text-gray-600 mt-1">{websiteName}</p>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-gray-100 rounded-full mb-6">
          <div 
            className="absolute left-0 top-0 h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-6">
          {deploymentSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div 
                key={step.title}
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
                    <CheckCircle className="w-5 h-5 text-green-600" />
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
              </div>
            );
          })}
        </div>

        {/* Loading spinner */}
        {progress < 100 && (
          <div className="flex items-center justify-center text-purple-600">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2 text-sm font-medium">
              {Math.round(progress)}% Complete
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentLoading;