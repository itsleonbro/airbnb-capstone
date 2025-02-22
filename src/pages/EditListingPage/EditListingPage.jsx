import React from "react";
import EditListingForm from "../../components/EditListingForm/EditListingForm";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import styles from "./EditListingPage.module.css";

const EditListingPage = () => {
  return (
    <div className={styles.container}>
      <NavbarUser />
      <div className={styles.content}>
        <EditListingForm />
      </div>
    </div>
  );
};

export default EditListingPage;