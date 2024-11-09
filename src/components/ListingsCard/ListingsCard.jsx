import React from "react";
import styles from "./ListingsCard.module.css";

const ListingsCard = () => {
  return (
    <div>
      <div className={styles.cardContainer}>
        <div className={styles.leftSide}>
          <img src="../../src/assets/listingimg.png" alt="" />
          <button className={styles.updateBtn}>Update</button>
          <button className={styles.deleteBtn}>Delete</button>
        </div>

        <div className={styles.rightSide}>
          <p>3 bedroom hotel</p>
          <h2>Sandton City Hotel</h2>
          <p>4-6 guests · Entire Home · 5 beds · 3 bath</p>
          <p>Wifi · Kitchen · Free Parking</p>
        </div>
      </div>
    </div>
  );
};

export default ListingsCard;
