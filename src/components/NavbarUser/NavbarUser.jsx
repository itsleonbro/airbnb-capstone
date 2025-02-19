import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarUser.module.css";
import AvatarMenu from "../AvatarMenu/AvatarMenu";

const NavbarUser = () => {
  return (
    <nav>
      <div className={styles.nav}>
        <div className={styles.navContainer}>
          <Link to="/home">
            <img src="/assets/airbnb.svg" alt="logo" height={32} />
          </Link>

          <div className={styles.rightMenu}>
            <p>Welcome, Leon</p>
            <AvatarMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;
