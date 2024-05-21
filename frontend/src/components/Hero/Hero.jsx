import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png"
import hero_image from "../Assets/hero_image.png"



const Hero = () => {
  const navigate = useNavigate(); // Call the hook here, at the top level of the component

  const handleCheckNowClick = () => {
    navigate("/mens");
  };
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div style={{ cursor: "pointer" }} onClick={handleCheckNowClick}>Latest Collection</div>
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
