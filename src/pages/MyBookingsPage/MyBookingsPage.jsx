import React from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import MyBookings from "../../components/MyBookings/MyBookings";
import styles from "./MyBookingsPage.module.css";

const MyBookingsPage = () => {
  return (
    <div className={styles.container}>
      <NavbarUser />
      <div className={styles.content}>
        <MyBookings />
      </div>
    </div>
  );
};

export default MyBookingsPage;
