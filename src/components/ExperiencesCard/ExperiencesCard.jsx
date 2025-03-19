import React from "react";
import styles from "./ExperiencesCard.module.css";

const ExperiencesCard = ({ title, type }) => {
  return (
    <div className={styles.experienceContainer}>
      <div className={styles.imageWrapper}>
        <img src="/assets/Airbnb-Homes-Cottage.webp" alt="" />
        <div className={styles.overlay}>
          <h2>{title}</h2>
          <button>{type}</button>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesCard;