import React, { useState, useEffect } from "react";
import { Code, CloudUpload, Rocket, DatabaseZap } from "lucide-react";

const CreatingWebsiteLoader = ({ isOpen, actionType }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay before starting animation for smoother entrance
      const timer = setTimeout(() => {
        setIsAnimatingIn(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimatingIn(false);
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 ease-in-out
        ${isAnimatingIn ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop with initial scale animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-lg
          transition-all duration-500 ease-out
          ${isAnimatingIn ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
      />

      {/* Main Content Wrapper */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div
          className={`relative w-full max-w-2xl transition-all duration-500 ease-out
            ${
              isAnimatingIn
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-8"
            }`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Glow Effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-purple-200/50 to-indigo-200/50 rounded-2xl blur-xl
            transition-opacity duration-500 ease-out
            ${isAnimatingIn ? "opacity-100" : "opacity-0"}`}
          />

          {/* Content Card */}
          <div className="relative bg-white/80 border border-gray-100 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
            {/* Header with staggered animation */}
            <div
              className={`text-center mb-8 transition-all duration-500 ease-out
                ${
                  isAnimatingIn
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: "300ms" }}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Creating Your Website
              </h2>
              <p className="text-gray-600 mt-2">
                Hold tight while we bring your vision to life
              </p>
            </div>

            {/* Progress Steps */}
            <div className="space-y-6">
              {[
                {
                  icon: <Code className="w-5 h-5" />,
                  label: "Generating Code",
                },
                {
                  icon: <DatabaseZap className="w-5 h-5" />,
                  label: "Configuring Data",
                },
                {
                  icon: <CloudUpload className="w-5 h-5" />,
                  label: "Saving to Cloud",
                },
                {
                  icon: <Rocket className="w-5 h-5" />,
                  label: "Deploying Website",
                },
              ]
                .filter((_, index) => actionType === "publish" || index < 3)
                .map((step, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ease-out
                    ${
                      isAnimatingIn
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <Step
                      icon={step.icon}
                      label={step.label}
                      delayClass={`animate-pulse delay-${index * 150}`}
                    />
                  </div>
                ))}
            </div>

            {/* Loading Bar */}
            <div
              className={`mt-8 bg-gray-100 rounded-full h-1.5 overflow-hidden transition-all duration-500 ease-out
                ${
                  isAnimatingIn
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-95"
                }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 w-full animate-loading" />
            </div>

            {/* Estimated Time */}
            <p
              className={`text-gray-500 text-sm text-center mt-4 transition-all duration-500 ease-out
                ${
                  isAnimatingIn
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              style={{ transitionDelay: "900ms" }}
            >
              Estimated time: ~{" "}
              {actionType === "publish" ? "1 minutes" : "10 secounds"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step component
const Step = ({ icon, label, delayClass }) => (
  <div className="flex items-center gap-4">
    <div
      className={`p-2 rounded-lg bg-purple-50 border border-purple-100 ${delayClass}`}
    >
      <div className="text-purple-600">{icon}</div>
    </div>
    <span className="text-gray-700 font-medium">{label}</span>
  </div>
);

// Loading animation
const style = document.createElement("style");
style.textContent = `
  @keyframes loading {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0); }
    100% { transform: translateX(100%); }
  }
  .animate-loading {
    animation: loading 2s infinite;
  }
`;
document.head.appendChild(style);

export default CreatingWebsiteLoader;
