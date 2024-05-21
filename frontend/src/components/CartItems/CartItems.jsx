import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import Checkout from "../checkout/checkout";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [cartItemsDescription, setCartItemsDescription] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    const updatedCartItemsDescription = [];

    all_product.forEach((e) => {
      if (cartItems[e.id] > 0) {
        let rentalPeriod = e.rentalPeriod;
        if (rentalPeriod) {
          rentalPeriod = {
            startDate: rentalPeriod.startDate,
            endDate: rentalPeriod.endDate
          };
        }
        updatedCartItemsDescription.push({
          _id: e._id,
          id: e.id,
          image: `images/${e.image}`,
          name: e.name,
          new_price: discountApplied ? (e.new_price * 0.8).toFixed(2) : e.new_price.toFixed(2),
          rental: e.isRental,
          rentalPeriod: rentalPeriod
        });
      }
    });
    setCartItemsDescription(updatedCartItemsDescription);
  }, [discountApplied]);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    // Check if the entered promo code is valid and apply discount if valid
    if (promoCode === "EXAMPLE20") { // Example promo code
      setDiscountApplied(true); // Apply discount
      setPromoCode(""); // Clear the promo code input field
    }
  };

  const formatCurrency = (value) => {
    return parseFloat(value).toFixed(2); // Convert value to float and limit to 2 decimal places
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>₹{formatCurrency(e.new_price)}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>₹{formatCurrency(e.new_price * cartItems[e.id])}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{formatCurrency(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{formatCurrency(discountApplied ? getTotalCartAmount() * 0.8 : getTotalCartAmount())}</h3> {/* Assuming 20% discount */}
            </div>
          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder="promo code" value={promoCode} onChange={handlePromoCodeChange} />
              <button onClick={applyPromoCode}>Submit</button>
            </div>
          </div>
          <Checkout cartItemsDescription={cartItemsDescription} />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
