import React, { useEffect, useState } from "react";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`${styles.notFoundPage} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.houseContainer}>
          <div className={styles.houseIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L4 9V21H20V9L12 3M12 5.8L18 10.2V19H6V10.2L12 5.8Z" />
              <path d="M9 14H15V21H9V14Z" />
            </svg>
          </div>
        </div>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Oops! This space isn't available</h2>
        <p className={styles.message}>
          Looks like this rental has floated away. Let's find you another
          perfect stay.
        </p>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => (window.location.href = "/home")}
            className={styles.homeButton}
          >
            Take me home
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default NotFoundPage;
