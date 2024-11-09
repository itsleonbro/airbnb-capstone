import React from "react";
import styles from "./ListingsPage.module.css";
import ListingsCard from "../../components/ListingsCard/ListingsCard";
import NavbarUser from "../../components/NavbarUser/NavbarUser";

const ListingsPage = () => {
  return (
    <div>
      <div className={styles.navbar}>
        <NavbarUser/>
      </div>
      <div className={styles.listing}>
        <div className={styles.options}>
          <button>View Reservations</button>
          <button>View Listings</button>
          <button>Create Listings</button>
        </div>

        <h2 className={styles.title}>My hotel listings</h2>

        <div className={styles.eachListing}>
          <ListingsCard />
          <ListingsCard />
          <ListingsCard />
          <ListingsCard />
          <ListingsCard />
          <ListingsCard />
          <ListingsCard />
          <ListingsCard />
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
