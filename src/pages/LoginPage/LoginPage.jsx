import React from "react";
import Login from "../../components/Login/Login";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginPageContainer}>
      <Login />
    </div>
  );
};

export default LoginPage;
