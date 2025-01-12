import React from "react";
import { useNavigate } from "react-router-dom";
import myImg from "../assets/templ_1.jpeg";
import myImg2 from "../assets/templ_2.jpeg";
import step1 from "../assets/choose_icon.png";
import step2 from "../assets/add_skills.png";
import step3 from "../assets/find_res.png";
import step4 from "../assets/download_res.png";
import review1 from "../assets/review-1.jpeg";
import review2 from "../assets/review-2.jpeg";
import review3 from "../assets/review-3.jpeg";

function Home() {
  const navigate = useNavigate();

  const handleBtn = (path) => {
    console.log(`Navigating to: ${path}`);

    navigate(path);
  };

  return (
    <div className="p-4">
      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center lg:gap-10 lg:items-start lg:justify-center m-6">
        <div className="w-full lg:w-[35%]">
          <img
            src={myImg}
            alt="images"
            className="my-12 mx-auto rounded-2xl border border-gray-400 h-[450px] shadow-2xl max-w-full"
          />
        </div>
        <div className="mt-0 lg:mt-16 w-full lg:w-[65%] flex flex-col text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl my-6 font-bold">
            "Craft Your Career with Style"
          </h1>
          <h2 className="mb-7 text-3xl lg:text-4xl font-semibold text-purple-700">
            Stylo Resume Builder
            <span className="text-purple-500">
              {" "}
              [Effortless, Stylish & Free to Use]
            </span>
          </h2>
          <p className="text-lg lg:text-xl mx-auto lg:mx-0 max-w-3xl">
            Stand out in your job search with Stylo’s intuitive resume builder.
            Select from a range of modern, professional templates and customize
            with just a few clicks. Join thousands who have streamlined their
            resume creation with Stylo—your gateway to a standout resume,
            completely free!
          </p>
          <div className="mt-5">
            <button
              type="submit"
              onClick={() => handleBtn("/steps")}
              className="px-16 lg:px-24 my-4 py-3 bg-purple-600 text-white font-bold text-base rounded-full hover:bg-purple-700"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="flex flex-col items-center mt-10 mx-auto">
        <h2 className="text-center text-3xl lg:text-5xl my-8 font-bold">
          Create a Resume That Stands Out
        </h2>
        <div className="flex max-sm:flex-col max-sm:items-center justify-center my-6 w-full gap-8 lg:gap-16">
          <div className="w-60 flex flex-col items-center">
            <img
              className="h-20 mb-4 lg:mb-8"
              src={step1}
              alt="Choose a template"
            />
            <div className="text-xl lg:text-2xl text-center font-semibold">
              Choose a template
            </div>
          </div>
          <div className="w-60 flex flex-col items-center">
            <img
              className="h-20 mb-4 lg:mb-8"
              src={step2}
              alt="Add Content Easily"
            />
            <div className="text-xl lg:text-2xl text-center font-semibold">
              Add Content Easily
            </div>
          </div>
          <div className="w-60 flex flex-col items-center">
            <img
              className="h-20 mb-4 lg:mb-8"
              src={step3}
              alt="Personalize Your Resume"
            />
            <div className="text-xl lg:text-2xl text-center font-semibold">
              Personalize Your Resume
            </div>
          </div>
          <div className="w-60 flex flex-col items-center">
            <img
              className="h-20 mb-4 lg:mb-8"
              src={step4}
              alt="Download Instantly"
            />
            <div className="text-xl lg:text-2xl text-center font-semibold">
              Download Instantly
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center m-6 lg:gao-10">
          <div className="w-full lg:w-[40%]">
            <img
              src={myImg2}
              alt="images"
              className="my-14 mx-auto rounded-xl border border-gray-500 h-[500px] shadow-2xl max-w-full"
            />
          </div>
          <div className="mt-10 w-full lg:w-[60%] flex flex-col text-center lg:text-left">
            <h2 className="mb-7 text-3xl lg:text-4xl font-semibold text-gray-600">
              Transform Your Resume. Transform Your Career.
            </h2>
            <p className="text-lg mx-auto">
              <span className="text-3xl text-purple-700 font-medium">
                Stylo Resume Builder -{" "}
              </span>
              More than just a tool, it's your career's best companion. Your
              resume should be extraordinary, and we make it happen. Elevate
              your professional image with our sleek, modern templates.
            </p>
            <ul className="space-y-3 text-lg lg:text-xl font-medium mt-5">
              <li>
                <span className="mx-2">✔️</span>Build your resume effortlessly
                with our expert-crafted suggestions.
              </li>
              <li>
                <span className="mx-2">✔️</span>Impress recruiters with
                stunning, professional designs.
              </li>
              <li>
                <span className="mx-2">✔️</span>Showcase the real you—the
                perfect candidate for your dream job.
              </li>
            </ul>
            <div className="mt-10">
              <button
                type="submit"
                onClick={() => handleBtn("/steps")}
                className="px-12 lg:px-16 my-9 py-3 bg-purple-600 text-white font-bold text-base rounded-full hover:bg-purple-700"
              >
                Create My Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="flex flex-col items-center m-6">
        <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-center">
          What people are saying about our Resume Maker
        </h2>
        <div className="flex flex-col lg:flex-row flex-wrap max-sm:items-center justify-center max-sm:flex-col">
          <div className="mb-5 md:m-6 lg:m-10 h-[280px] w-full lg:w-[340px] rounded-t-xl bg-purple-100 shadow-xl">
            <div className="rounded-t-xl bg-purple-700 h-4"></div>
            <div>
              <div className="flex items-center">
                <div className="my-4 ml-6 w-[25%]">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={review1}
                    alt="Michael Anderson"
                  />
                </div>
                <div className="mt-3 w-[75%]">
                  <h4 className="text-lg font-medium">Michael Anderson</h4>
                  <p className="text-xs text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="font-semibold text-center m-5">
                "Stylo Resume Builder made updating my resume so easy! The
                templates are modern and professional."
              </p>
            </div>
          </div>
          <div className="mb-5 md:m-6 lg:m-10 h-[280px] w-full lg:w-[340px] rounded-t-xl bg-purple-100 shadow-xl">
            <div className="rounded-t-xl bg-purple-700 h-4"></div>
            <div>
              <div className="flex items-center">
                <div className="my-4 ml-6 w-[25%]">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={review2}
                    alt="Sarah Thompson"
                  />
                </div>
                <div className="mt-3 w-[75%]">
                  <h4 className="text-lg font-medium">Sarah Thompson</h4>
                  <p className="text-xs text-gray-600">Marketing Manager</p>
                </div>
              </div>
              <p className="font-semibold text-center m-5">
                "I had an amazing experience with the Stylo Resume Builder. The
                process was smooth and the results were impressive. Highly
                recommended!"
              </p>
            </div>
          </div>
          <div className="mb-5 md:m-6 lg:m-10 h-[280px] w-full lg:w-[340px] rounded-t-xl bg-purple-100 shadow-xl">
            <div className="rounded-t-xl bg-purple-700 h-4"></div>
            <div>
              <div className="flex items-center">
                <div className="my-4 ml-6 w-[25%]">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={review3}
                    alt="David Lee"
                  />
                </div>
                <div className="mt-3 w-[75%]">
                  <h4 className="text-lg font-medium">David Lee</h4>
                  <p className="text-xs text-gray-600">Sales Executive</p>
                </div>
              </div>
              <p className="font-semibold text-center m-5">
                "The resume builder is intuitive and easy to use. It made
                creating a standout resume quick and effortless."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
