import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  SignUp,
  Login,
  AuthLayout,
  AllTemplates,
  CreateResume,
  ResumeView,
  UserProfile,
  StepsPage,
  CreateWebsite,
  WebsiteDemo,
  TemplateTypeSelectionPage,
  AllWebsiteTemplatesPage,
  MyWebsites,
} from "./components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import EditResume from "./components/EditResume.jsx";
import About from "./pages/About.jsx";
import PaymentGateway from "./components/PaymentGateway/PaymentGateway.jsx";
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
            <Login />
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
        path: "/allTemplates",
        element: (
          <AuthLayout authentication>
            <AllTemplates />
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
        path: "/createResume/:templateId",
        element: (
          <AuthLayout authentication>
            <CreateResume />
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
        path: "/editResume/:resumeId",
        element: (
          <AuthLayout authentication>
            <EditResume />
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
        path: "/resumeView/:templateId/:resumeId",
        element: (
          <AuthLayout authentication>
            <ResumeView />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/website-demo/:websiteType/:templateId",
    element: <WebsiteDemo />,
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
