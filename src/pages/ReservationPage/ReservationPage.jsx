import React from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import styles from "./ReservationPage.module.css";

const ReservationPage = () => {
  return (
    <div className={styles.container}>
      <NavbarUser />
      <div className={styles.content}>
        <ReservationForm />
      </div>
    </div>
  );
};

export default ReservationPage;
