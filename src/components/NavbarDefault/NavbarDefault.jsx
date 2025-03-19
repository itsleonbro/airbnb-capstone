import React, { useState } from "react";
import styles from "./NavbarDefault.module.css";
import ProfilePopUp from "../ProfilePopUp/ProfilePopUp";
import { Link } from "react-router-dom";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector } from "react-redux";

const NavbarDefault = () => {
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setProfilePopUp(!profilePopUp);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // get auth state from redux
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);

  return (
    <>
      <nav>
        <div className={styles.navContainer}>
          <div className={styles.leftSection}>
            <button
              className={styles.mobileMenuToggle}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            
            <div className={styles.logo}>
              <Link to="/home">
                <img
                  src="/assets/airbnb-white.svg"
                  alt="Airbnb logo"
                  height={32}
                />
              </Link>
            </div>
          </div>

          <div
            className={`${styles.centerMenu} ${
              mobileMenuOpen ? styles.active : ""
            }`}
          >
            <ul>
              <li>
                <Link to="/browse-listings">Places to Stay</Link>
              </li>
              <li>Experiences</li>
              <li>Online Experiences</li>
            </ul>
          </div>

          <div className={styles.rightMenu}>
            <ul>
              {isAuthenticated ? (
                <span>Welcome, {username}</span>
              ) : (
                <Link to="/signup">
                  <li>Become a Host</li>
                </Link>
              )}

              <li className={styles.languageIcon}>
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