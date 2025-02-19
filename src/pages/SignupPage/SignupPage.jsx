import React from "react";
import SignUp from "../../components/SignUp/SignUp";
import styles from "./SignupPage.module.css";

const SignupPage = () => {
  return (
    <div>
      <div className={styles.signupContainer}>
        <SignUp />
      </div>
    </div>
  );
};

export default SignupPage;
