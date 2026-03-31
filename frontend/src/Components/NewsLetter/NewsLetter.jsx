import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Newsletter</h1>
      <p>Sign up for our weekly emails</p>
      <div className="enterEmail">
        <input type="email" placeholder="Enter Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
