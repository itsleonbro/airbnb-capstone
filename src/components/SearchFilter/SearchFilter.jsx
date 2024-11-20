import React, { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import styles from "./SearchFilter.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GuestPopup from "../GuestPopup/GuestPopup";

const SearchFilter = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);

  console.log(isGuestPopupOpen);

  return (
    <div className={styles.searchbar}>
      <div className={styles.searchbarContainer}>
        <div className={styles.hotels}>
          <label htmlFor="hotels" className={styles.title}>
            Locations
          </label>

          <select name="" id="">
            <option value="hotel one">Select location</option>
            <option value="hotel one">hotel one</option>
            <option value="hotel two">hotel two</option>
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
          />
        </div>

        <div
          className={styles.guests}
          onClick={() => setIsGuestPopupOpen(!isGuestPopupOpen)}
        >
          <div className={styles.title}>Guests</div>
          <div className={styles.dropdown}>Add guests</div>
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

        <div className={styles.search}>
          <SearchRoundedIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
