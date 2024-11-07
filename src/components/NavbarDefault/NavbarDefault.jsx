import React from "react";
import "./NavbarDefault.css";
import { Link } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";

const NavbarDefault = () => {
  return (
    <>
      <nav>
        <div className="logo">
          <Link to="/home">
            <img src="./src/assets/airbnb.svg" alt="airbnb logo" height={32} />
          </Link>
        </div>
        <div className="center-menu">
          <ul>
            <li>Places to stay</li>
            <li>Experiences</li>
            <li>Online Experiences</li>
          </ul>
        </div>
        <div className="right-menu">
          <ul>
            <li>Become a Host</li>
            <li className="profile">
              <span>
                <MenuRoundedIcon sx={{ color: "#000" }} />
              </span>
              <span>
                <PermIdentityRoundedIcon sx={{ color: "#000" }} />
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavbarDefault;
