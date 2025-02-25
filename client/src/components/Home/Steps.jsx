import React from "react";
import { Palette, PenLine, Globe, ChevronRight } from 'lucide-react';

const Steps = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto container md:px-16 px-6 py-14 md:mt-32">
        <div className="text-center space-y-1 my-4">
          <h2 className="text-slate-700 font-bold md:text-3xl text-2xl">How It Works</h2>
          <p className="md:text-lg text-base font-semibold">
            Creating your website is quick and simple. Just follow these three
            easy steps!
          </p>
        </div>
        <div className="mt-20 max-w-5xl mx-auto relative md:mb-24">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-[100px] right-[100px] h-1 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 -translate-y-1/2 rounded-full"></div>
    
            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="group relative">
                <div className="relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
                  {/* Step Number */}
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
              <div className="group relative">
                <div className="relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
                  {/* Step Number */}
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
              <div className="group relative">
                <div className="relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
                  {/* Step Number */}
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
      </div>
    </>
  );
};

export default Steps;
