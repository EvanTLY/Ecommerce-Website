import React from "react";
import "./Navbar.css";
import logo from "../../assets/nav-logo.svg";
import profile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="" />
      <img className="profile" src={profile} alt="" />
    </div>
  );
};

export default Navbar;
