import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarUser.module.css";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import { useSelector } from "react-redux";
import ProfilePopUp from "../ProfilePopUp/ProfilePopUp";

const NavbarUser = () => {
  const [profilePopUp, isProfilePopUp] = useState(false);

  const handleProfileClick = () => {
    console.log("clicked");
    isProfilePopUp(!profilePopUp);
  };

  // get auth state from redux
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);

  return (
    <nav>
      <div className={styles.nav}>
        <div className={styles.navContainer}>
          <Link to="/home">
            <img src="/assets/airbnb.svg" alt="logo" height={32} />
          </Link>

          <div className={styles.rightMenu}>
            <p>
              {isAuthenticated ? (
                `Welcome, ${username}`
              ) : (
                <Link to="/signup">
                  <li>Become a Host</li>
                </Link>
              )}
            </p>
            <ul>
              <li className={styles.profile} onClick={handleProfileClick}>
                <AvatarMenu />
              </li>
            </ul>

            <div className={styles.popup}>
              {profilePopUp && <ProfilePopUp />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;
