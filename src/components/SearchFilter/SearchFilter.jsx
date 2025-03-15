import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import styles from "./SearchFilter.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GuestPopup from "../GuestPopup/GuestPopup";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchFilter = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/accommodations`);

        const uniqueLocations = [
          ...new Set(response.data.map(item => item.location)),
        ];
        setLocations(uniqueLocations.sort());
        setError("");
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
    // Build query parameters for the search
    const queryParams = new URLSearchParams();

    if (selectedLocation) {
      queryParams.append("location", selectedLocation);
    }

    if (startDate && endDate) {
      queryParams.append("checkIn", startDate.toISOString());
      queryParams.append("checkOut", endDate.toISOString());
    }

    if (guestCount > 0) {
      queryParams.append("guests", guestCount);
    }

    // Navigate to browse listings page with the search parameters
    navigate(`/browse-listings?${queryParams.toString()}`);
  };

  return (
    <div className={styles.searchbar}>
      <div className={styles.searchbarContainer}>
        <div className={styles.hotels}>
          <label htmlFor="location" className={styles.title}>
            Locations
          </label>

          <select
            name="location"
            id="location"
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
            disabled={loading}
          >
            <option value="">Select location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.checkIn}>
          <div className={styles.title}>Check in</div>

          <div className={styles.dropdown}>
            <DatePicker
              className={styles.datePicker}
              placeholderText="Add dates"
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>
        </div>

        <div className={styles.checkOut}>
          <div className={styles.title}>Check out</div>
          <DatePicker
            className={styles.datePicker}
            placeholderText="Add dates"
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={
              startDate ? new Date(startDate.getTime() + 86400000) : new Date()
            }
            disabled={!startDate}
          />
        </div>

        <div
          className={styles.guests}
          onClick={() => setIsGuestPopupOpen(!isGuestPopupOpen)}
        >
          <div className={styles.title}>Guests</div>
          <div className={styles.dropdown}>
            {guestCount > 0
              ? `${guestCount} Guest${guestCount > 1 ? "s" : ""}`
              : "Add guests"}
          </div>
          {isGuestPopupOpen && (
            <div
              className={styles.guestPopup}
              onClick={e => e.stopPropagation()}
            >
              <GuestPopup
                setGuestCount={setGuestCount}
                guestCount={guestCount}
              />
            </div>
          )}
        </div>

        <div className={styles.search} onClick={handleSearch}>
          <SearchRoundedIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
