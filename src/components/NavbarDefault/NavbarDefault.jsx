import React, { useState } from "react";
import styles from "./NavbarDefault.module.css"; // Import styles as a module
import ProfilePopUp from "../ProfilePopUp/ProfilePopUp";
import { Link } from "react-router-dom";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";

const NavbarDefault = () => {
  const [profilePopUp, isProfilePopUp] = useState(false);

  const handleProfileClick = () => {
    isProfilePopUp(!profilePopUp);
  };

  return (
    <>
      <nav>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <Link to="/home">
              <img
                src="./src/assets/airbnb-white.svg"
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
              <Link to="/login">
                <li>Become a Host</li>
              </Link>

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
