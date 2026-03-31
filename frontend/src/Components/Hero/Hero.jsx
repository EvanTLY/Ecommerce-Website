import React from "react";
import "./Hero.css";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <p>New</p>
          <p>Collections</p>
          <p>For Everyone</p>
        </div>
        <div className="hero-latest-icon">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
