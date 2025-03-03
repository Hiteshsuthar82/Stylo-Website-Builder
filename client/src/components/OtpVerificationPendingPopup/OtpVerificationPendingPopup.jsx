import React, { useState } from "react";
import { X, Mail, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerificationPendingPopup = ({ onClose, userId }) => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const apiurl = import.meta.env.VITE_API_URL;

  const handleVerifyNow = async () => {
    setIsVerifying(true);
    try {
      const response = await axios.post(
        `${apiurl}/user/resend-otp`,
        { userId },
        { withCredentials: true }
      );

      if (response?.data.success) {
        setVerificationSent(true);
        setTimeout(() => {
          navigate("/verify-otp");
        }, 2000);
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleGoToProfile = () => {
    navigate("/profile");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
        {verificationSent ? (
          // Success State
          <div className="py-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-50 p-4 rounded-full">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verification Email Sent!</h3>
            <p className="text-gray-600 mb-4">
              We've sent a verification code to your email address.
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Redirecting to verification page...
            </p>
          </div>
        ) : (
          // Initial State
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                <h3 className="text-xl font-semibold text-gray-800">Verification Required</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="py-6">
              <div className="flex justify-center mb-6">
                <div className="bg-amber-50 p-4 rounded-full">
                  <Mail className="w-10 h-10 text-amber-500" />
                </div>
              </div>
              
              <p className="text-gray-600 text-center mb-2">
                Your email address hasn't been verified yet.
              </p>
              <p className="text-gray-500 text-sm text-center mb-6">
                Please verify your email to access all features and ensure account security.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleVerifyNow}
                  disabled={isVerifying}
                  className="w-full p-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Verify Now"
                  )}
                </button>
                
                <button
                  onClick={handleGoToProfile}
                  className="w-full p-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Go to Profile
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpVerificationPendingPopup;