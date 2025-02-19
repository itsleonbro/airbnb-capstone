import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";

import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.signUpBtn}>
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </div>
      </form>

      <p>
        Have an account? <Link to={"/login"}>Log In</Link>
      </p>
    </div>
  );
};

export default SignUp;
