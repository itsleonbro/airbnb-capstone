import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAuthError } from "../../store/actions/authActions";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get auth state from redux
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.role);

  // check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      if (role === "host") {
        navigate("/admin/view-listings");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, role, navigate]);

  // clear any auth errors when component unmounts
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearAuthError());
      }
    };
  }, [dispatch, error]);

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch(login(username, password));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
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
          />
        </div>

        <a href="#" className={styles.forgotPassword}>
          Forgot password?
        </a>
        <div className={styles.loginBtn}>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
