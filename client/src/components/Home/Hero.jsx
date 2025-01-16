import React from "react";
import hero from "../../assets/hero.jpeg";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const Hero = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto container bg-gradient-to-b from-white to-purple-200 md:px-16 px-6 py-14 flex md:flex-row flex-col gap-5 items-center border">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="font-semibold text-left">Stylo Website Builder</p>
          <h1 className="md:text-5xl text-3xl font-bold my-5 text-purple-700">
            Build a Stunning Website Without the Hassle
          </h1>
          <p className="md:text-xl text-base">
            Effortlessly build and launch single-page websites without coding.
            Choose, customize, and deploy with just a few clicks.
          </p>
          <div className="my-8 flex md:justify-normal justify-center">
            <button className="relative group px-6 py-3 bg-purple-500 hover:bg-purple-700 text-white rounded-lg transition duration-300 flex items-center">
              Get Started for Free
              {/* <LiaLongArrowAltRightSolid className="ml-1 hidden group-hover:block text-xl duration-300" /> */}
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-2xl md:w-[550px] shadow-xl hover:shadow-purple-700 duration-300 shadow-purple-400 hover:scale-[1.05]  ">
            <img className="rounded-2xl " src={hero} alt="hero-image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
