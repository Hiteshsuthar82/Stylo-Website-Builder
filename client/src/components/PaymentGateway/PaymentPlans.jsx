import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";

const PaymentPlans = ({ togglePlansPopup }) => {
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
      price: "₹ 500/month",
      features: ["Unlimited Websites", "Premium Templates", "24/7 Support", "Unlimited deployments"],
      type: "professional",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm"
        onClick={togglePlansPopup}
      />

      {/* Popup Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 z-10 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
          onClick={togglePlansPopup}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Choose Your Premium Plan
          </h2>
          <p className="text-slate-600">
            Select a plan based on the number of websites you want to create
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {premiumPlans.map((plan) => (
            <div
              key={plan.name}
              className="border border-slate-200 rounded-lg p-6 flex flex-col hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-slate-900 mt-2">
                  {plan.price}
                </p>
              </div>

              <div className="text-center py-3 bg-slate-100 rounded-lg mb-4">
                <span className="font-bold text-slate-800">
                  {plan.websites}
                </span>
                <span className="text-slate-600"></span>
              </div>

              <ul className="mb-6 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center mb-2">
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
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors duration-300 flex items-center justify-center gap-2"
                onClick={() => handlePlanSelection(plan.type)}
              >
                <Crown className="w-4 h-4 text-yellow-300" />
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentPlans;
