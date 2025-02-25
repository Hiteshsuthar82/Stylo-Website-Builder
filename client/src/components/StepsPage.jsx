import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, PenLine, Globe, ChevronRight, Trash2, Share2, Link, Layout } from 'lucide-react';

function StepsPage() {
  const navigate = useNavigate();
  const [showSteps, setShowSteps] = useState([false, false, false]);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    // Animate steps sequentially
    const stepTimers = [
      setTimeout(() => setShowSteps(prev => [true, prev[1], prev[2]]), 500),
      setTimeout(() => setShowSteps(prev => [prev[0], true, prev[2]]), 1000),
      setTimeout(() => setShowSteps(prev => [prev[0], prev[1], true]), 1500),
      // Show features after steps are complete
      setTimeout(() => setShowFeatures(true), 500)
    ];

    return () => stepTimers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Create Your Website with Stylo
        </h1>
        <p className="text-xl text-slate-700">
          Three simple steps to bring your website to life
        </p>
      </div>

      {/* Steps Container */}
      <div className="max-w-5xl mx-auto relative mb-24">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-1/2 left-[100px] right-[100px] h-1 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 -translate-y-1/2 rounded-full"></div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className={`transform transition-all duration-700 ${showSteps[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
              {/* Rest of Step 1 content remains the same */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-600 text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-white">
                1
              </div>
              
              <div className="pt-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-slate-100 rounded-xl">
                    <Palette className="w-10 h-10 text-slate-600" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  Choose Template
                </h3>
                
                <p className="text-slate-700 text-center">
                  Select from our beautiful, professionally designed templates
                </p>
              </div>

              <ChevronRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 text-slate-400 z-10" />
            </div>
          </div>

          {/* Step 2 */}
          <div className={`transform transition-all duration-700 ${showSteps[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
              {/* Rest of Step 2 content remains the same */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-600 text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-white">
                2
              </div>
              
              <div className="pt-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-slate-100 rounded-xl">
                    <PenLine className="w-10 h-10 text-slate-600" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  Add Content
                </h3>
                
                <p className="text-slate-700 text-center">
                  Customize with your text, images, and brand elements
                </p>
              </div>

              <ChevronRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 text-slate-400 z-10" />
            </div>
          </div>

          {/* Step 3 */}
          <div className={`transform transition-all duration-700 ${showSteps[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
              {/* Rest of Step 3 content remains the same */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-600 text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-white">
                3
              </div>
              
              <div className="pt-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-slate-100 rounded-xl">
                    <Globe className="w-10 h-10 text-slate-600" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  Publish Website
                </h3>
                
                <p className="text-slate-700 text-center">
                  Go live with your website in just one click
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Animation */}
      <div className={`max-w-5xl mx-auto mb-16 transform transition-all duration-700 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          Powerful Management Features
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Features content remains the same */}
          {[
            {
              icon: <Layout className="w-6 h-6 text-slate-600" />,
              title: "Dashboard",
              description: "Access and manage all your websites from one central dashboard",
              bgColor: "bg-slate-100"
            },
            {
              icon: <Trash2 className="w-6 h-6 text-red-600" />,
              title: "Delete",
              description: "Easily remove websites you no longer need with one click",
              bgColor: "bg-red-100"
            },
            {
              icon: <Share2 className="w-6 h-6 text-blue-600" />,
              title: "Share",
              description: "Share your website directly to social media platforms",
              bgColor: "bg-blue-100"
            },
            {
              icon: <Link className="w-6 h-6 text-green-600" />,
              title: "Copy Link",
              description: "Copy your website URL instantly to share anywhere",
              bgColor: "bg-green-100"
            }
          ].map((feature, index) => (
            <div 
              key={feature.title}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform 
                ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                transition-all duration-700 delay-${index * 200}`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 ${feature.bgColor} rounded-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              </div>
              <p className="text-slate-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className={`max-w-xl mx-auto mt-16 text-center transform transition-all duration-700 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button 
          className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 ease-out bg-slate-900 rounded-xl group hover:scale-[1.02]"
          onClick={() => navigate('/template-type-selection-page')}
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-slate-700 group-hover:translate-x-0 ease">
            <ChevronRight className="w-6 h-6" />
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Start Building Your Website</span>
          <span className="relative invisible">Start Building Your Website</span>
        </button>
      </div>
    </div>
  );
}

export default StepsPage;