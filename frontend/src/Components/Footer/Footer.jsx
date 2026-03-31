import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
import ig_icon from "../Assets/instagram_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOP</p>
      </div>

      <ul className="footer-link">
        <li>Company</li>
        <li>Product</li>
        <li>Offices</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icon">
          <img src={ig_icon} alt="" />
        </div>
        <div className="footer-icon">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>© 2026</p>
      </div>
    </div>
  );
};

export default Footer;
