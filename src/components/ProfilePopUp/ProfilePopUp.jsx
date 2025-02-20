import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfilePopUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";
const ProfilePopUp = () => {
  // get auth state from redux
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div>
        <div className={styles.popUpContainer}>
          <div className={styles.popUpContent}>
            {isAuthenticated ? (
              <p onClick={handleLogout}>Logout</p>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePopUp;
