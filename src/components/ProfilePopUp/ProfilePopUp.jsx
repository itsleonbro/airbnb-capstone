import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfilePopUp.module.css";

const ProfilePopUp = () => {
  return (
    <>
      <div>
        <div className={styles.popUpContainer}>
          <div className={styles.popUpContent}>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePopUp;
