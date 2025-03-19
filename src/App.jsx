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
import ListingDetailsPage from "./pages/ListingDetailsPage/ListingDetailsPage.jsx";
import BrowseListingsPage from "./pages/BrowseListingsPage/BrowseListingsPage.jsx";
import ReservationPage from "./pages/ReservationPage/ReservationPage.jsx";
import MyBookingsPage from "./pages/MyBookingsPage/MyBookingsPage.jsx";
import AdminReservationsPage from "./pages/AdminReservationsPage/AdminReservationsPage.jsx";
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
        <Route path="/admin/reservations" element={<AdminReservationsPage />} />
        <Route path="/listing/:id" element={<ListingDetailsPage />} />
        <Route path="/browse-listings" element={<BrowseListingsPage />} />
        <Route path="/reserve/:id" element={<ReservationPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
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
