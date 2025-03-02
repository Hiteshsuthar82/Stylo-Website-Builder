import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  SignUp,
  AuthLayout,
  UserProfile,
  StepsPage,
  CreateWebsite,
  WebsiteDemo,
  TemplateTypeSelectionPage,
  AllWebsiteTemplatesPage,
  MyWebsites,
  AuthPage,
} from "./components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PaymentGateway from "./components/PaymentGateway/PaymentGateway.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import OtpVerification from "./components/otpVerification/OtpVerification.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <AuthPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/payment-gateway",
        element: (
          <AuthLayout authentication>
            <PaymentGateway />
          </AuthLayout>
        ),
      },
      {
        path: "/userProfile",
        element: (
          <AuthLayout authentication>
            <UserProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/steps",
        element: (
          <AuthLayout authentication>
            <StepsPage />
          </AuthLayout>
        ),
      },
      {
        path: "/template-selection/:websiteType",
        element: (
          <AuthLayout authentication>
            <AllWebsiteTemplatesPage />
          </AuthLayout>
        ),
      },
      {
        path: "/template-type-selection-page",
        element: (
          <AuthLayout authentication>
            <TemplateTypeSelectionPage />
          </AuthLayout>
        ),
      },
      {
        path: "/create-website/:websiteType/:templateId",
        element: (
          <AuthLayout authentication>
            <CreateWebsite />
          </AuthLayout>
        ),
      },
      {
        path: "/myWebsites",
        element: (
          <AuthLayout authentication>
            <MyWebsites />
          </AuthLayout>
        ),
      },
      {
        path: "/verify-otp",
        element: <OtpVerification />,
      },
    ],
  },
  {
    path: "/website-demo/:websiteType/:templateId",
    element: <WebsiteDemo />,
  },
  {
    path: "/admin",
    element: (
      // <A/uthLayout authentication>
      <AdminDashboard />
      // </AuthLayout>
    ),
  },
]);

// createRoutesFromElements(
//   <Route path="/" element={<Layout />}>
//     <Route path="/" element={<App />} />
//     <Route path="/signup" element={<SignUp />} />
//     <Route path="/login" element={<Login />} />
//   </Route>
// )

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
