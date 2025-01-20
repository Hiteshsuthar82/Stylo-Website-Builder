import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import loadingimg from "./assets/loading-logo.gif";
import { getCurrentUser, login, logout } from "./features/authslice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Call get current user API
    const fetchUser = async () => {
      try {
        const resultAction = await dispatch(getCurrentUser());
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch(logout());
      } finally {
        // setTimeout(() => setLoading(false), 6000);
        setLoading(false)
      }
    };

    fetchUser();
  }, [dispatch]);

  return !loading ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    "Loading..."
    // <div className="h-screen w-screen flex justify-center items-center bg-[linear-gradient(0deg,_rgba(113,50,229,1)_0%,_rgba(163,75,246,1)_100%)] text-center">
    //   <img className="md:h-screen w-screen" src={loadingimg} alt="" />
    // </div>
  );
}

export default App;
