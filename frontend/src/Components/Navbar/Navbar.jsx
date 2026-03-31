import React, { useContext, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const [menu, setMenu] = React.useState("home");
  const menuRef = useRef();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <p>SHOP</p>
      </div>

      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />

      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            HOME
          </Link>{" "}
          {menu === "home" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("men");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/men">
            MEN
          </Link>{" "}
          {menu === "men" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("women");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/women">
            WOMEN
          </Link>{" "}
          {menu === "women" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            KIDS
          </Link>{" "}
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("authToken") ? (
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
