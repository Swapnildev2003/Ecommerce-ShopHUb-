
// import React, { useContext, useState, useEffect } from "react";
import React, { useContext, useState, useEffect } from "react";

import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [display, setDisplay] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [rentalPeriod, setRentalPeriod] = useState("1 day");
  useEffect(() => {
    if (props.product.category === "rent-dress-here") {
      setDisplay(true);
    }
    console.log(props.product, "he i am here")
  }, [props.category]);

  // const handleRentalPeriodChange = (e) => {
  //   setRentalPeriod(e.target.value);
  // };

  const fetchData = async () => {
    try {
      // console.log(rentalPeriod);
      const res = await fetch("http://localhost:4000/rental", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rentalPeriod: {
            startDate,
            endDate
          },
          productId: props.product._id
        })
      });
      const data = await res.json(); // Assuming response is JSON
      console.log(data); // Log the response data
    } catch (error) {
      console.error("Error fetching rental data:", error);
    }
  };

  // Now use fetchData inside useEffect
  useEffect(() => {
    if (startDate && endDate) {
      console.log("rental called")
      fetchData();

    }


  }, [startDate, endDate]);

  // console.log(product.category);
  // const { addToCart } = useContext(ShopContext);



  const handleStartDateChange = (event) => {
    setStartDate((event.target.value));
    console.log(new Date(startDate))
  };

  const handleEndDateChange = (event) => {
    setEndDate((event.target.value));
    console.log(new Date(endDate))
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
            <s>  ₹{product.old_price}</s>
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
        {display && (

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
