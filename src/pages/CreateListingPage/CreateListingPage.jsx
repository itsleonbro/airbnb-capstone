import React from "react";
import CreateListingForm from "../../components/CreateListingForm/CreateListingForm";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import styles from "./CreateListingPage.module.css";

const CreateListingPage = () => {
  return (
    <div className={styles.container}>
      <NavbarUser />
      <div className={styles.content}>
        <CreateListingForm />
      </div>
    </div>
  );
};

export default CreateListingPage;
