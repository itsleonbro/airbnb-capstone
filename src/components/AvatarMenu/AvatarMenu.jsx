import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import styles from "./AvatarMenu.module.css";

const AvatarMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.burgerIcon}>
        <MenuRoundedIcon sx={{ color: "#000" }} />
      </div>
      <div className={styles.profile}>
        <AccountCircleRoundedIcon sx={{ color: "#D1D5DB", fontSize: "36px" }} />
      </div>
    </div>
  );
};

export default AvatarMenu;
