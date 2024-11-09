import React, { useState } from "react";
import styles from "./Login.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
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

        <a href="#" className={styles.forgotPassword}>
          Forgot Password ?
        </a>
        <div className={styles.loginBtn}>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
