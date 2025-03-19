import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import AdminReservations from "../../components/AdminReservations/AdminReservations";
import styles from "./AdminReservationsPage.module.css";

const AdminReservationsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <NavbarUser />
      </div>
      <div className={styles.listing}>
        <div className={styles.options}>
          <button onClick={() => navigate("/admin/reservations")}>
            View Reservations
          </button>
          <button onClick={() => navigate("/admin/view-listings")}>
            View Listings
          </button>
          <button onClick={() => navigate("/admin/create-listing")}>
            Create Listing
          </button>
        </div>

        <h2 className={styles.title}>Reservation Management</h2>

        <div className={styles.content}>
          <AdminReservations />
        </div>
      </div>
    </div>
  );
};

export default AdminReservationsPage;
