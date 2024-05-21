import React from "react";
import { useNavigate } from "react-router-dom";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  const navigate = useNavigate(); // Call the hook here, at the top level of the component

  const handleCheckNowClick = () => {
    navigate("/mens");
  };

  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCT</p>
        <button onClick={handleCheckNowClick}>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="Exclusive Offers" />
      </div>
    </div>
  );
};

export default Offers;
