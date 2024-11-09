import React from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  const location = useLocation();

  // paths where footer wont be rendered
  const noFooterPaths = ["/login"];

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      {/* conditionally rendered footer*/}
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
