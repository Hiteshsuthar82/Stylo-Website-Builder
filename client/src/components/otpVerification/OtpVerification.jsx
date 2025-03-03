import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const apiKey = import.meta.env.VITE_API_URL;
  const userData = useSelector((state) => state.auth.user);


  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setStatus({ type: "", message: "" });

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((digit, index) => {
        if (index < 4) newOtp[index] = digit;
      });
      setOtp(newOtp);
      if (pastedData.length === 4) {
        inputRefs.current[3].focus();
      }
    }
  };

  const handleResend = async () => {
    setIsResendingOtp(true)
    const response = await axios.post(
      `${apiKey}/user/resend-otp`,
      { userId: userData?._id },
      { withCredentials: true }
    );
    console.log(response);

    if (response?.data.success) {
      setIsResendingOtp(false)
      setOtp(["", "", "", ""]);
      setTimer(30);
      setStatus({ type: "success", message: "A new OTP has been sent to your device" });
      inputRefs.current[0].focus();
    }
    setIsResendingOtp(false)
  };

  const handleVerifyOtp = async () => {
    setIsVerifying(true);
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 4) {
      setStatus({ type: "error", message: "Please enter the complete 4-digit OTP" });
      setIsVerifying(false);
      return;
    }

    try {
      // const response = await verifyOtp(enteredOtp);
      const response = await axios.post(
        `${apiKey}/user/verify-email`,
        { userId: userData?._id, otp: enteredOtp },
        { withCredentials: true }
      );
      console.log(response);

      setStatus({
        type: response?.data.success ? "success" : "error",
        message: response?.data.success ? "OTP verified successfully!" : "Invalid OTP. Please try again."
      });
      if (response?.data.success) {
        setTimeout(() => {
          navigate("/")
        }, 2500);
      }
    } catch (error) {
      setStatus({ type: "error", message: "Verification failed. Please try again." });
    }
    setIsVerifying(false);
  };

  // Mock API function
  const verifyOtp = async (otp) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: otp === "1234" });
      }, 1000);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Required
          </h2>
          <p className="text-gray-600">
            Enter the 4-digit code sent to your device
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-2xl font-semibold border-2 rounded-lg 
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                         transition-all duration-200"
              />
            ))}
          </div>

          {status.message && (
            <div className={`p-4 rounded-lg text-sm ${status.type === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : ''
              }`}>
              {status.message}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleVerifyOtp}
              disabled={otp.includes("") || isVerifying}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium 
                       transition-all duration-200 
                       ${otp.includes("") || isVerifying
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-600'}`}
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleResend}
                disabled={timer > 0}
                className={`w-full py-3 px-4 rounded-lg font-medium 
                       transition-all duration-200 
                       ${timer > 0
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-blue-600 bg-blue-50 hover:bg-blue-100 active:bg-blue-200'}`}
              >
                {timer > 0 ? `Resend in ${timer}s` : isResendingOtp ? "Sending... " : "Resend Code"}
              </button>
              {/* <button
                onClick={() => navigate("/")}
                className={`w-full py-3 px-4 rounded-lg font-medium cursor-pointer
                       transition-all duration-200  bg-slate-100 hover:bg-slate-300
                      `}
              >
                Skip
              </button> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;