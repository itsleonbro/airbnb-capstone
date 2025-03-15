import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/users/signup`, {
        username,
        password,
        role,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "something went wrong. please try again."
      );
      console.error("signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
            required
            minLength={6}
          />
          <small className={styles.helper}>minimum 6 characters</small>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className={styles.input}
          >
            <option value="user">User</option>
            <option value="host">Host</option>
          </select>
        </div>

        <div className={styles.signUpBtn}>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "signing up..." : "sign up"}
          </button>
        </div>
      </form>

      <p>
        have an account? <Link to="/login">log in</Link>
      </p>
    </div>
  );
};

export default SignUp;
