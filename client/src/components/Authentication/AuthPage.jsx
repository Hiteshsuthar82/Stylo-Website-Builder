import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login, signup } from "../../features/authslice";
import { useNavigate } from "react-router-dom";
import buttonLoader from "./../../assets/button-loader.gif";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import registration_img from "./../../assets/registration.png";
import login_img from "./../../assets/login.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  // Separate password visibility states for each form
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showSignupPass, setShowSignupPass] = useState(false);
  const [showSignupConfirmPass, setShowSignupConfirmPass] = useState(false);
  // Add loading states for each form
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  // Add animation states for text transitions
  const [textFadeIn, setTextFadeIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Toggle functions for each form's password visibility
  const toggleLoginPassword = () => {
    setShowLoginPass(!showLoginPass);
  };

  const toggleSignupPassword = () => {
    setShowSignupPass(!showSignupPass);
  };

  const toggleSignupConfirmPassword = () => {
    setShowSignupConfirmPass(!showSignupConfirmPass);
  };

  // Use separate form hooks for login and signup
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle between login and signup with animation for text
  const handleFormSwitch = (isLoginForm) => {
    // Trigger text fade out
    setTextFadeIn(false);

    // After a short delay, change form and then fade in the new text
    setTimeout(() => {
      setIsLogin(isLoginForm);
      // Short delay before fading in the new text
      setTimeout(() => {
        setTextFadeIn(true);
      }, 100);
    }, 300);
  };

  useEffect(() => {
    // Initialize AOS with more options for smoother animations
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: false, // Changed to false to allow animations to occur each time
      mirror: true, // Mirror animations when scrolling up
    });
  }, []);

  const handleLogin = async (data) => {
    try {
      setIsLoginLoading(true);
      const session = await dispatch(login(data)).unwrap();
      if (session) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      console.log("Error during login:", error);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignup = async (data) => {
    try {
      setIsSignupLoading(true);
      const session = await dispatch(signup(data)).unwrap();
      if (session) {
        const loginResult = await dispatch(login(data)).unwrap();
        if (loginResult) {
          navigate("/");
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      console.log("Error during signup or login:", error);
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen sm:p-4">
      <div className="relative h-[600px] md:w-[900px] w-full bg-opacity-10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl border border-slate-300">
        <div
          className={`hidden md:block absolute top-0 w-1/2 h-full bg-gradient-to-br from-slate-300 to-slate-600 transition-all duration-[2000ms] ease-in-out z-10 border border-slate-300
            ${isLogin ? "translate-x-0 left-1/2" : "left-0"}`}
        >
          <div
            data-aos={isLogin ? "fade-left" : "fade-right"}
            data-aos-duration="1200"
            className="h-full w-full flex flex-col items-center justify-center text-white p-8"
          >
            <div
              className={`h-80 mb-5 rounded-2xl shadow-2xl shadow-black transition-all duration-1000 ${
                textFadeIn ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              <img
                src={isLogin ? login_img : registration_img}
                alt={isLogin ? "login-img" : "registration-img"}
                className={`h-80 rounded-2xl border border-slate-500 transition-all duration-1000 ${
                  textFadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            </div>
            <h2
              className={`text-4xl font-bold mb-3 transition-all duration-500 ${
                textFadeIn
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              {isLogin ? "Welcome Back!" : "New Here?"}
            </h2>
            <p
              className={`text-center transition-all duration-700 delay-100 ${
                textFadeIn
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              {isLogin
                ? "Login to access your account and continue your journey!"
                : "Sign up and discover great opportunities!"}
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div
          className={`absolute top-20 w-full md:w-[82%] md:ml-[3.7%] md:px-0 px-4 h-full transition-all duration-[2000ms] ease-in-out 
          ${
            isLogin
              ? "translate-x-0 rotate-0 opacity-100"
              : "-translate-x-[120%]  md:-rotate-90 opacity-0 "
          } transform`}
        >
          <div className="w-full md:w-1/2 p-8 rounded-lg shadow-lg border shadow-slate-500">
            <h2 className="text-3xl font-bold text-slate-600 text-center mb-3">
              Login
            </h2>
            <div className="bg-slate-500 w-[33%] h-1 mx-auto" />
            <form
              onSubmit={handleSubmitLogin(handleLogin)}
              className="space-y-6 mt-6"
            >
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  {...registerLogin("username", {
                    required: "Username is required",
                  })}
                  className={`w-full border shadow-xl outline-none focus:border-slate-500 duration-1000 px-3 py-2 rounded-lg  ${
                    loginErrors.username
                      ? "focus:border-red-500 border-red-500 outline-none "
                      : " "
                  }`}
                />
                {loginErrors.username && (
                  <p className="text-red-400 text-sm">
                    {loginErrors.username.message}
                  </p>
                )}
              </div>
              <div>
                <div className="flex items-center w-full relative">
                  <input
                    type={showLoginPass ? "text" : "password"}
                    placeholder="Password"
                    {...registerLogin("password", {
                      required: "Password is required",
                    })}
                    className={`w-full border shadow-xl outline-none focus:border-slate-500 duration-1000 px-3 pr-8 py-2 rounded-lg  ${
                      loginErrors.password
                        ? "focus:border-red-500 border-red-500 outline-none"
                        : " "
                    }`}
                  />
                  <span
                    className="absolute right-2 text-gray-500 cursor-pointer"
                    onClick={toggleLoginPassword}
                  >
                    {showLoginPass ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>

                {loginErrors.password && (
                  <p className="text-red-400 text-sm">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>
              <div className="flex gap-3" data-aos="fade-right">
                <input type="checkbox" />
                <p className="text-gray-800">Remember Me</p>
              </div>
              <div data-aos="fade-right">
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-600 transition-transform transform duration-500"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? (
                    <img
                      src={buttonLoader}
                      alt="Loading..."
                      className="w-6 h-6 mx-auto"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-gray-600 text-sm">
              Don't have an account?
              <span
                onClick={() => handleFormSwitch(false)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                {" "}
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <div
          className={` md:w-[87%] w-full md:ml-[31.5%] md:px-0 px-4  h-full flex items-center justify-center transition-all duration-[2000ms] ease-in-out
          ${
            !isLogin
              ? "translate-x-0 rotate-0 opacity-100"
              : "translate-x-[120%] md:rotate-90 opacity-0"
          } transform`}
        >
          <div className="md:w-1/2 w-full p-8 border shadow-slate-500 rounded-lg shadow-lg">
            <h2
              className="text-3xl font-bold text-slate-600 text-center mb-3"
              data-aos="fade-left"
            >
              Sign Up
            </h2>
            <div className="bg-slate-500 w-[40%] h-1 mx-auto" />
            <form
              onSubmit={handleSubmitSignup(handleSignup)}
              className="space-y-3 mt-6"
            >
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  {...registerSignup("username", {
                    required: "Username is required",
                  })}
                  className={`w-full border shadow-xl outline-none focus:border-slate-500 duration-1000 px-3 py-2 rounded-lg  ${
                    signupErrors.username
                      ? "focus:border-red-500 border-red-500 outline-none "
                      : " "
                  }`}
                />
                {signupErrors.username && (
                  <p className="text-red-400 text-sm">
                    {signupErrors.username.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...registerSignup("fullName", {
                    required: "Name is required",
                  })}
                  className={`w-full border shadow-xl outline-none focus:border-slate-500 duration-1000 px-3 py-2 rounded-lg  ${
                    signupErrors.fullName
                      ? "focus:border-red-500 border-red-500 outline-none "
                      : " "
                  }`}
                />
                {signupErrors.fullName && (
                  <p className="text-red-400 text-sm">
                    {signupErrors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...registerSignup("email", {
                    required: "Email is required",
                  })}
                  className={`w-full border shadow-xl outline-none focus:border-slate-500 duration-1000 px-3 py-2 rounded-lg  ${
                    signupErrors.email
                      ? "focus:border-red-500 border-red-500 outline-none "
                      : " "
                  }`}
                />
                {signupErrors.email && (
                  <p className="text-red-400 text-sm">
                    {signupErrors.email.message}
                  </p>
                )}
              </div>
              <div>
                <div className="w-full flex items-center relative">
                  <input
                    type={showSignupPass ? "text" : "password"}
                    placeholder="Password"
                    {...registerSignup("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                    className={`w-full border shadow-xl outline-none focus:border-slate-500 duration-1000 px-3 pr-8 py-2 rounded-lg  ${
                      signupErrors.password
                        ? "focus:border-red-500 border-red-500 outline-none "
                        : " "
                    }`}
                  />
                  <span
                    className="absolute right-2 text-gray-500 cursor-pointer"
                    onClick={toggleSignupPassword}
                  >
                    {showSignupPass ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                {signupErrors.password && (
                  <p className="text-red-400 text-sm ">
                    {signupErrors.password.message}
                  </p>
                )}
              </div>
              <div>
                <div className="w-full flex items-center relative">
                  <input
                    type={showSignupConfirmPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...registerSignup("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                    className={`w-full border shadow-xl outline-none focus:border-slate-500 duration-1000 px-3 pr-8 py-2 rounded-lg  ${
                      signupErrors.confirmPassword
                        ? "focus:border-red-500 border-red-500 outline-none "
                        : " "
                    }`}
                  />
                  <span
                    className="absolute right-2 text-gray-500 cursor-pointer"
                    onClick={toggleSignupConfirmPassword}
                  >
                    {showSignupConfirmPass ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                {signupErrors.confirmPassword && (
                  <p className="text-red-400 text-sm">
                    {signupErrors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-600 transition-transform transform duration-500"
                disabled={isSignupLoading}
              >
                {isSignupLoading ? (
                  <img
                    src={buttonLoader}
                    alt="Loading..."
                    className="w-6 h-6 mx-auto"
                  />
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600 text-sm">
              Already have an account?
              <span
                onClick={() => handleFormSwitch(true)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                {" "}
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
      {errorMessage ? (
        <div className="fixed top-20 right-5 z-50 bg-red-500 py-2 pl-5 pr-10 rounded-md text-white ">
          {errorMessage}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AuthPage;
