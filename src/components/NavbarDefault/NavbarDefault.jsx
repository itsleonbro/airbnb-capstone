import React, { useState } from "react";
import styles from "./NavbarDefault.module.css";
import ProfilePopUp from "../ProfilePopUp/ProfilePopUp";
import { Link } from "react-router-dom";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";

import { useSelector } from "react-redux";

const NavbarDefault = () => {
  const [profilePopUp, isProfilePopUp] = useState(false);

  const handleProfileClick = () => {
    isProfilePopUp(!profilePopUp);
  };

  // get auth state from redux
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);

  return (
    <>
      <nav>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <Link to="/home">
              <img
                src="/assets/airbnb-white.svg"
                alt="airbnb logo"
                height={32}
              />
            </Link>
          </div>
          <div className={styles.centerMenu}>
            <ul>
              <li>Places to stay</li>
              <li>Experiences</li>
              <li>Online Experiences</li>
            </ul>
          </div>

          <div className={styles.rightMenu}>
            <ul>
              {isAuthenticated ? (
                `Welcome, ${username}`
              ) : (
                <Link to="/login">
                  <li>Become a Host</li>
                </Link>
              )}

              <li>
                <LanguageRoundedIcon sx={{ color: "#fff" }} />
              </li>

              <li className={styles.profile} onClick={handleProfileClick}>
                <AvatarMenu />
              </li>
            </ul>
          </div>

          <div className={styles.popup}>{profilePopUp && <ProfilePopUp />}</div>
        </div>
      </nav>
    </>
  );
};

export default NavbarDefault;
