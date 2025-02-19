import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarUser.module.css";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import { useSelector } from "react-redux";

const NavbarUser = () => {
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
            <AvatarMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;
