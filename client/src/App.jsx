import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import { getCurrentUser, logout } from "./features/authslice";
import StyloLoader from "./components/StyloLoader";

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getCurrentUser());
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch(logout());
      } finally {
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => setShowContent(true), 800); // Delay content show to match exit animation
        }, 5300);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      <StyloLoader loading={loading} />
      {showContent && (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </>
  );
}

export default App;