import React from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/HomePage/HomePage.jsx";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFoundPage/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import ListingsPage from "./pages/ListingsPage/ListingsPage.jsx";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      {/* conditionally rendered footer*/}
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
