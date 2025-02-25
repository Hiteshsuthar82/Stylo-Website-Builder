import React, { useState } from "react";
import Profile from "./Profile";
import { Logo, Container } from "../index";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Crown } from "lucide-react";
import PaymentPlans from "../PaymentGateway/PaymentPlans";

function Header() {
  const navigate = useNavigate();
  const authstatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPlansPopup, setShowPlansPopup] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePlansPopup = () => {
    setShowPlansPopup(!showPlansPopup);
  };

  const handlePlanSelection = (planType) => {
    // Close the popup
    setShowPlansPopup(false);
    // Redirect to payment gateway with the selected plan
    navigate(`/payment-gateway?plan=${planType}`);
  };

  

  const navitems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authstatus,
    },
    // {
    //   name: "SignUp",
    //   slug: "/signup",
    //   active: !authstatus,
    // },
    {
      name: "Create Website",
      slug: "/steps",
      active: authstatus,
    },
  ];

  return (
    <header>
      <Container>
        <nav className="fixed top-0 left-0 right-0 z-50 flex gap-2 justify-between items-center px-5 md:px-14 py-3 text-md bg-white/95 backdrop-blur-sm border-b border-slate-200">
          <Link to={"/"}>
            <Logo />
          </Link>
          <ul className="hidden md:flex items-center space-x-8">
            {navitems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `font-medium transition-all duration-300 ${
                        isActive
                          ? "text-slate-800 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-slate-800"
                          : "text-slate-600 hover:text-slate-800"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>
          <div>
            {authstatus ? (
              <div className="flex flex-row-reverse gap-2">
                <nav className=" md:hidden border-gray-200">
                  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <button
                      onClick={toggleMenu}
                      type="button"
                      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none"
                      aria-controls="navbar-default"
                      aria-expanded={isMenuOpen}
                    >
                      {isMenuOpen ? (
                        // Close icon SVG
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        // Hamburger menu SVG
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 17 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                          />
                        </svg>
                      )}
                    </button>

                    <div
                      className={`${
                        isMenuOpen ? "" : "hidden"
                      }  shadow-2xl md:w-auto absolute top-14 right-0 w-48`}
                      id="navbar-default"
                    >
                      <div
                        className="h-screen w-screen fixed top-0 left-0 z-10"
                        onClick={toggleMenu}
                      ></div>
                      <ul className="drop-shadow-xl absolute font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 z-20 rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                        {navitems.map((item) =>
                          item.active ? (
                            <li key={item.name} className="">
                              <NavLink
                                to={item.slug}
                                className={({ isActive }) =>
                                  `${
                                    isActive
                                      ? "block py-2 px-3 text-white bg-white/50 rounded md:bg-transparent md:text-blue-700 md:p-0"
                                      : "block py-2 px-3 text-white rounded hover:bg-white/10 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                                  }`
                                }
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  </div>
                </nav>

                <Profile />

                {userData?.isPremium ? (
                  ""
                ) : (
                  <button
                    className="flex items-center text-sm gap-2 px-2 py-1 text-white font-semibold rounded-lg bg-slate-800 transition-all duration-300 relative overflow-hidden"
                    onClick={togglePlansPopup}
                  >
                    <Crown className="w-4 h-4 text-yellow-300 animate-bounce" />
                    Premium
                    <span className="absolute inset-0 bg-white opacity-10 blur-lg rounded-lg"></span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-row-reverse gap-2">
                <nav className=" md:hidden border-gray-200">
                  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <button
                      onClick={toggleMenu}
                      type="button"
                      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden focus:outline-none "
                      aria-controls="navbar-default"
                      aria-expanded={isMenuOpen}
                    >
                      {isMenuOpen ? (
                        // Close icon SVG
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        // Hamburger menu SVG
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 17 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                          />
                        </svg>
                      )}
                    </button>

                    <div
                      className={`${
                        isMenuOpen ? "" : "hidden"
                      }  shadow-2xl md:w-auto absolute top-14 right-[-10PX] w-48`}
                      id="navbar-default"
                    >
                      <div
                        className="h-screen w-screen fixed top-0 left-0 z-10"
                        onClick={toggleMenu}
                      ></div>
                      <ul className="drop-shadow-xl w-40 absolute font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 z-20 rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
                        {navitems.map((item) =>
                          item.active ? (
                            <li key={item.name} className="">
                              <NavLink
                                to={item.slug}
                                className={({ isActive }) =>
                                  `${
                                    isActive
                                      ? "block py-2 px-3 text-white bg-white/50 rounded md:bg-transparent md:text-blue-700 md:p-0"
                                      : "block py-2 px-3 text-white rounded hover:bg-white/10 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                                  }`
                                }
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  </div>
                </nav>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded-lg font-semibold"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </nav>
      </Container>

      {/* Premium Plans Popup */}
      {showPlansPopup && (
        <PaymentPlans togglePlansPopup={togglePlansPopup}/>
      )}
    </header>
  );
}

export default Header;