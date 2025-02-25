import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";

const PaymentGateway = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const apiurl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();

  // Premium plans data
  const premiumPlans = [
    // {
    //   name: "Standard",
    //   websites: 1,
    //   price: "₹ 100/month",
    //   features: ["1 Website", "Premium Templates", "Standard Support"],
    //   type: "standard"
    // },
    {
      name: "Professional",
      websites: "Unlimited Websites",
      price: "500/month",
      features: ["Unlimited Websites", "Premium Templates", "24/7 Support"],
      type: "professional"
    },
  ];

  // Get customer details from localStorage or your auth state
  const customerName = "John Doe"; // Replace with actual user data
  const email = "johndoe@gmail.com"; // Replace with actual user data

  useEffect(() => {
    // Get the plan type from URL query parameters
    const params = new URLSearchParams(location.search);
    const planType = params.get("plan");

    // If plan type is specified, find the matching plan
    if (planType) {
      const plan = premiumPlans.find((p) => p.type === planType);
      if (plan) {
        setSelectedPlan(plan);
      } else {
        // If no matching plan, default to the first plan
        setSelectedPlan(premiumPlans[0]);
      }
    } else {
      // If no plan specified, default to the first plan
      setSelectedPlan(premiumPlans[0]);
    }
  }, [location]);

  const handlePlanChange = (planType) => {
    const plan = premiumPlans.find((p) => p.type === planType);
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;

    setIsProcessing(true);

    // Generate a unique order ID
    const orderId = `ORD-${Date.now().toString().slice(-8)}`;

    // Log payment details
    console.log("Payment initiated:", {
      timestamp: new Date().toISOString(),
      amount: selectedPlan.price,
      planName: selectedPlan.name,
      planType: selectedPlan.type,
      websites: selectedPlan.websites,
      orderId,
      customerName,
      email,
      paymentMethod: "Credit Card",
    });

    try {
      const response = await axios.patch(
        `${apiurl}/user/upgrade-to-premium`,
        {
          orderId,
          planType: selectedPlan.type,
          buyingDateAndTime: new Date().toISOString(),
        },
        { withCredentials: true }
      );

      if (response?.data.success) {
        setIsProcessing(false);
        setShowToast(true);
        console.log("Payment completed successfully");

        // Hide toast and redirect after 2 seconds
        setTimeout(() => {
          setShowToast(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setIsProcessing(false);
      // Handle payment failure (could add error toast here)
    }
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Success Toast */}
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
          showToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center space-x-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium text-lg">Payment Successful!</span>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="pb-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex items-center justify-center gap-2">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    <span className="text-2xl font-bold text-center text-gray-800">
                      Premium Plan
                    </span>
                  </div>

                  {/* Plan Selection Tabs */}
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden mt-4">
                    {premiumPlans.map((plan) => (
                      <button
                        key={plan.type}
                        onClick={() => handlePlanChange(plan.type)}
                        className={`flex-1 text-center py-2 px-4 ${
                          selectedPlan?.type === plan.type
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {plan.name}
                      </button>
                    ))}
                  </div>

                  {/* Selected Plan Details */}
                  <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="text-center mb-4">
                      <div className="text-xl font-bold text-slate-800">
                        {selectedPlan.name} Plan
                      </div>
                      <div className="text-2xl font-bold text-slate-900 mt-1">
                        {selectedPlan.priceDisplay}
                      </div>
                    </div>

                    <div className="text-center py-2 bg-slate-100 rounded-lg mb-4">
                      <span className="font-bold text-slate-800">
                        {selectedPlan.websites}
                      </span>
                      <span className="text-slate-600">
                        {" "}
                        {selectedPlan.websites === 1 ? "Website" : "Websites"}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="text-lg font-medium text-gray-800 mb-4">
                    Payment Details
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-semibold">{selectedPlan.name}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold">
                        ₹ {selectedPlan.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Websites</span>
                      <span className="font-semibold">
                        {selectedPlan.websites}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Customer</span>
                      <span className="font-semibold">{customerName}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email</span>
                      <span className="font-semibold">{email}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  </div>

                  <div className="mt-6 flex justify-center space-x-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>

                  <div className="text-xs text-center text-gray-500 mt-4">
                    Your payment information is processed securely. We do not
                    store credit card details.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentGateway;
