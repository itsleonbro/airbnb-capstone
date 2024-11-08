import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.support}>
          <h2>Support</h2>
          <ul>
            <li>Help Center</li>
            <li>Safety information</li>
            <li>Cancellation options</li>
            <li>Our COVID-19 Response</li>
            <li>Supporting people with disabilities</li>
            <li>Report a neighborhood concern</li>
          </ul>
        </div>

        <div className={styles.community}>
          <h2>Community</h2>
          <ul>
            <li>Airbnb.org: disaster relief housing</li>
            <li>Support: Afghan refugees</li>
            <li>Celebrating diversity & belonging</li>
            <li>Combating discrimination</li>
          </ul>
        </div>

        <div className={styles.hosting}>
          <h2>Hosting</h2>
          <ul>
            <li>Hosting</li>
            <li>Try hosting</li>
            <li>AirCover: protection for Hosts</li>
            <li>Explore hosting resources</li>
            <li>Visit our community forum</li>
            <li>How to host responsibly</li>
          </ul>
        </div>

        <div className={styles.about}>
          <h2>About</h2>
          <ul>
            <li>About</li>
            <li>Newsroom</li>
            <li>Learn about new features</li>
            <li>Letter from our founders</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Airbnb Luxe</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
