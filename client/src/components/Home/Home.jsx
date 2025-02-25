import React, { useEffect } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Steps from "./Steps";
import Testimonial from "./Testimonial";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { getCurrentUser, logout } from "../../features/authslice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getCurrentUser());
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch(logout());
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Hero />
      <Steps />
      <Features />
      <Testimonial />
      <Footer />
    </>
  );
}

export default Home;
