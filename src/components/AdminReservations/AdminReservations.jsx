import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchHostReservations } from "../../store/actions/reservationActions";
import styles from "./AdminReservations.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminReservations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.role);
  const loading = useSelector(state => state.reservation.loading);
  const error = useSelector(state => state.reservation.error);
  const hostReservations = useSelector(
    state => state.reservation.hostReservations
  );

  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || role !== "host") {
      navigate("/login");
      return;
    }

    dispatch(fetchHostReservations());
  }, [dispatch, isAuthenticated, role, navigate]);

  // sortin reservations into upcoming and past
  useEffect(() => {
    const now = new Date();

    const upcoming = hostReservations
      .filter(reservation => new Date(reservation.checkOut) >= now)
      .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));

    const past = hostReservations
      .filter(reservation => new Date(reservation.checkOut) < now)
      .sort((a, b) => new Date(b.checkOut) - new Date(a.checkOut));

    setUpcomingReservations(upcoming);
    setPastReservations(past);
  }, [hostReservations]);

  const formatDate = dateString => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-ZA", options);
  };

  const getImageUrl = accommodation => {
    if (accommodation.images && accommodation.images.length > 0) {
      return `${API_BASE_URL}/${accommodation.images[0].path}`;
    }
    return "/assets/listingimg.png";
  };

  const renderReservations = reservations => {
    if (reservations.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p>No {activeTab} reservations found.</p>
          <button
            className={styles.createButton}
            onClick={() => navigate("/admin/create-listing")}
          >
            Create a New Listing
          </button>
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

          <div className={styles.guestInfo}>
            <span className={styles.guestName}>
              Guest: {reservation.user_id.username}
            </span>
          </div>

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
            <button className={styles.contactButton}>Contact Guest</button>
          </div>
        </div>
      </div>
    ));
  };

  if (loading && hostReservations.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loader}></div>
          <p>Loading reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "upcoming" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Bookings
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
          Past Bookings
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

export default AdminReservations;
