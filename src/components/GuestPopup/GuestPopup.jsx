import React from "react";
import styles from "./GuestPopup.module.css";

const GuestPopup = ({ guestCount, setGuestCount }) => {
  return (
    <>
      <div className={styles.guestContainer}>
        <div className={styles.adults}>
          <div className={styles.adultsLeft}>
            <p className={styles.title}>Adults</p>
            <p>Ages 13 or above</p>
          </div>

          <div className={styles.adultsRight}>
            <button
              onClick={() => {
                if (guestCount > 1) {
                  setGuestCount(prevState => prevState - 1);
                }
              }}
            >
              -
            </button>
            <p className={styles.count}>{guestCount}</p>
            <button
              onClick={() => {
                if (guestCount < 10) {
                  setGuestCount(prevState => prevState + 1);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestPopup;
