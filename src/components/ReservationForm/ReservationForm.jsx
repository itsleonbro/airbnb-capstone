import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createReservation,
  clearReservation,
} from "../../store/actions/reservationActions";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ReservationForm.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ReservationForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get auth and reservation state
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.reservation.loading);
  const error = useSelector(state => state.reservation.error);
  const success = useSelector(state => state.reservation.success);

  const [listing, setListing] = useState(null);
  const [listingLoading, setListingLoading] = useState(true);

  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(
    new Date(new Date().setDate(checkIn.getDate() + 1))
  );
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(1);

  // redirect if not authed
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setListingLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/api/accommodations/${id}`
        );
        setListing(response.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setListingLoading(false);
      }
    };

    fetchListing();

    // clean up the reservation state when component unmounts
    return () => {
      dispatch(clearReservation());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (success) {
      navigate("/my-bookings");
    }
  }, [success, navigate]);

  // calc total price whenever dates or listing changes
  useEffect(() => {
    if (listing) {
      const msPerDay = 1000 * 60 * 60 * 24;
      const nightsCount = Math.round(Math.abs((checkOut - checkIn) / msPerDay));
      setNights(nightsCount);

      let total = listing.price * nightsCount;

      // apply weekly discount if applicable
      if (nightsCount >= 7 && listing.weeklyDiscount) {
        const discount = (listing.weeklyDiscount / 100) * total;
        total -= discount;
      }

      //  fixed fees
      total += listing.cleaningFee || 0;
      total += listing.serviceFee || 0;
      total += listing.occupancyTaxes || 0;

      setTotalPrice(total);
    }
  }, [listing, checkIn, checkOut]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!listing) return;

    const reservationData = {
      accommodation_id: id,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    };

    dispatch(createReservation(reservationData));
  };

  if (listingLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!listing) {
    return <div className={styles.error}>Listing not found</div>;
  }

  return (
    <div className={styles.reservationForm}>
      <h2>Make a Reservation</h2>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.listingInfo}>
        <h3>{listing.title}</h3>
        <p className={styles.location}>{listing.location}</p>
        <p className={styles.price}>R{listing.price} per night</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Check-in Date</label>
          <DatePicker
            selected={checkIn}
            onChange={date => {
              setCheckIn(date);

              // Ensure checkout is after checkin
              if (date >= checkOut) {
                setCheckOut(new Date(date.getTime() + 86400000)); // next day
              }
            }}
            minDate={new Date()}
            className={styles.datePicker}
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Check-out Date</label>
          <DatePicker
            selected={checkOut}
            onChange={setCheckOut}
            minDate={new Date(checkIn.getTime() + 86400000)} // day after check-in
            className={styles.datePicker}
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Number of Guests</label>
          <select
            value={guests}
            onChange={e => setGuests(parseInt(e.target.value))}
            className={styles.select}
            required
          >
            {[...Array(listing.guests)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.priceDetails}>
          <h3>Price Details</h3>

          <div className={styles.priceRow}>
            <span>
              R{listing.price} × {nights} nights
            </span>
            <span>R{listing.price * nights}</span>
          </div>

          {nights >= 7 && listing.weeklyDiscount > 0 && (
            <div className={styles.priceRow}>
              <span>Weekly discount ({listing.weeklyDiscount}%)</span>
              <span className={styles.discount}>
                -R
                {Math.round(
                  (listing.weeklyDiscount / 100) * (listing.price * nights)
                )}
              </span>
            </div>
          )}

          {listing.cleaningFee > 0 && (
            <div className={styles.priceRow}>
              <span>Cleaning fee</span>
              <span>R{listing.cleaningFee}</span>
            </div>
          )}

          {listing.serviceFee > 0 && (
            <div className={styles.priceRow}>
              <span>Service fee</span>
              <span>R{listing.serviceFee}</span>
            </div>
          )}

          {listing.occupancyTaxes > 0 && (
            <div className={styles.priceRow}>
              <span>Occupancy taxes</span>
              <span>R{listing.occupancyTaxes}</span>
            </div>
          )}

          <div className={styles.totalRow}>
            <span>Total (ZAR)</span>
            <span>R{totalPrice}</span>
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={() => navigate(`/listing/${id}`)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.bookButton}
            disabled={loading}
          >
            {loading ? "Booking..." : "Reserve Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
