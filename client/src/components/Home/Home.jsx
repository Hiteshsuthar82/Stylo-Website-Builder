import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import Steps from "./Steps";
import Testimonial from "./Testimonial";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleBtn = (path) => {
    navigate(path);
  };

  return (
    <>
      <Hero />
      <Steps />
      <Features />
      <Testimonial />
    </>
  );
}

export default Home;
