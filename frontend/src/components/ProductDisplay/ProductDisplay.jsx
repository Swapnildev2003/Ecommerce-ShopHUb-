import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  console.log(product.category);
  const { addToCart } = useContext(ShopContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleAddToCart = () => {
    if (product.category === "rent-dress-here") {
      if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
      }
      if (new Date(startDate) > new Date(endDate)) {
        alert("End date cannot be before start date.");
        return;
      }
    }
    if (product.category.trim().toLowerCase() === "rent-dress-here") {
      addToCart(product.id, { startDate, endDate });
    } else {
      addToCart(product.id);
    }
  };
  
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            <s> ₹{product.old_price}</s>
          </div>
          <div className="productdisplay-right-price-new">
            ₹ {product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close fitting and with
          a round neckline and short sleeves, worn as an undershirt or garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size:</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>

        {product.category === "rent-dress-here" && (
          <div className="productdisplay-right-size">
            <h1>Renting Dates</h1>
            <div className="productdisplay-right-sizes">
              <div>
                <label htmlFor="start-date">Start Date:</label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(event) => handleStartDateChange(event)}
                />
              </div>
              <div>
                <label htmlFor="end-date">End Date:</label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(event) => handleEndDateChange(event)}
                />
              </div>
            </div>
          </div>
        )}

        <button onClick={handleAddToCart}>Add to Cart</button>
        <p className="productdisplay-right-category">
          <span>Category :</span>Women, T-Shirt, Crop-Top,
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest, Trendy
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
