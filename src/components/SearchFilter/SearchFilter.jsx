import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import styles from "./SearchFilter.module.css";
import { colors } from "@mui/material";

const SearchFilter = () => {
  return (
    <div className={styles.searchbar}>
      <div className={styles.searchbarContainer}>
        <div className={styles.hotels}>
          <label htmlFor="hotels">Hotels</label>
          <div className={styles.dropdown}>Select location</div>
          <select name="" id="">
            <option value="hotel one">hotel one</option>
            <option value="hotel two">hotel two</option>
          </select>
        </div>

        <div className={styles.checkIn}>
          <div className={styles.title}>Check in</div>
          <div className={styles.dropdown}>Add dates</div>
        </div>

        <div className={styles.checkOut}>
          <div className={styles.title}>Check out</div>
          <div className={styles.dropdown}>Add dates</div>
        </div>

        <div className={styles.guests}>
          <div className={styles.title}>Guest</div>
          <div className={styles.dropdown}>Add guests</div>
        </div>

        <div className={styles.search}>
          <SearchRoundedIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
