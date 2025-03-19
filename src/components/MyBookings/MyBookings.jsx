import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserReservations,
  deleteReservation,
} from "../../store/actions/reservationActions";
import styles from "./MyBookings.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userReservations, loading, error } = useSelector(
    state => state.reservation
  );
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(fetchUserReservations());
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    const now = new Date();

    const upcoming = userReservations
      .filter(reservation => new Date(reservation.checkOut) >= now)
      .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));

    const past = userReservations
      .filter(reservation => new Date(reservation.checkOut) < now)
      .sort((a, b) => new Date(b.checkOut) - new Date(a.checkOut));

    setUpcomingReservations(upcoming);
    setPastReservations(past);
  }, [userReservations]);

  const handleCancelReservation = id => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      dispatch(deleteReservation(id));
    }
  };

  const formatDate = dateString => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-ZA", options);
  };

  const getImageUrl = accommodation => {
    if (accommodation.images && accommodation.images.length > 0) {
      const imagePath = accommodation.images[0].path;

      const cleanPath = imagePath.replace(/^uploads\//, "");
      return `${API_BASE_URL}/uploads/${cleanPath}`;
    }
    return "/assets/listingimg.png";
  };

  const renderReservations = reservations => {
    if (reservations.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p>No {activeTab} bookings found.</p>
          {activeTab === "upcoming" && (
            <button
              className={styles.browseButton}
              onClick={() => navigate("/browse-listings")}
            >
              Browse Listings
            </button>
          )}
        </div>
      );
    }

    return reservations.map(reservation => (
      <div key={reservation._id} className={styles.bookingCard}>
        <div className={styles.imageContainer}>
          <img
            src={getImageUrl(reservation.accommodation_id)}
            alt={reservation.accommodation_id.title}
            className={styles.accommodationImage}
          />
        </div>

        <div className={styles.bookingDetails}>
          <h3>{reservation.accommodation_id.title}</h3>
          <p className={styles.location}>
            {reservation.accommodation_id.location}
          </p>

          <div className={styles.dateRange}>
            <span>{formatDate(reservation.checkIn)}</span>
            <span className={styles.dateSeparator}>→</span>
            <span>{formatDate(reservation.checkOut)}</span>
          </div>

          <div className={styles.bookingMeta}>
            <span className={styles.guests}>
              {reservation.guests}{" "}
              {reservation.guests === 1 ? "guest" : "guests"}
            </span>
            <span className={styles.price}>R{reservation.totalPrice}</span>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.viewButton}
              onClick={() =>
                navigate(`/listing/${reservation.accommodation_id._id}`)
              }
            >
              View Property
            </button>

            {activeTab === "upcoming" && (
              <button
                className={styles.cancelButton}
                onClick={() => handleCancelReservation(reservation._id)}
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    ));
  };

  if (loading && userReservations.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loader}></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Bookings</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "upcoming" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
          {upcomingReservations.length > 0 && (
            <span className={styles.badge}>{upcomingReservations.length}</span>
          )}
        </button>

        <button
          className={`${styles.tabButton} ${
            activeTab === "past" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
          {pastReservations.length > 0 && (
            <span className={styles.badge}>{pastReservations.length}</span>
          )}
        </button>
      </div>

      <div className={styles.bookingsList}>
        {activeTab === "upcoming"
          ? renderReservations(upcomingReservations)
          : renderReservations(pastReservations)}
      </div>
    </div>
  );
};

export default MyBookings;
