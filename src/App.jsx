import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/HomePage/HomePage.jsx";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFoundPage/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import ListingsPage from "./pages/ListingsPage/ListingsPage.jsx";
import CreateListingPage from "./pages/CreateListingPage/CreateListingPage.jsx";
import EditListingPage from "./pages/EditListingPage/EditListingPage.jsx";
import "./App.css";
const App = () => {
  const location = useLocation();

  // paths where footer wont be rendered
  const noFooterPaths = ["/login", "/signup"];

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/view-listings" element={<ListingsPage />} />
        <Route path="/admin/create-listing" element={<CreateListingPage />} />
        <Route path="/admin/edit-listing/:id" element={<EditListingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      {/* conditionally rendered footer*/}
      {!noFooterPaths.includes(location.pathname) && <Footer />}
      <SpeedInsights />
    </div>
  );
};

export default App;
