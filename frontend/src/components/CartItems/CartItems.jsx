import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import Checkout from "../checkout/checkout"
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [cartItemsDescription, setCartItemsDescription] = useState([]);
  // const [final_cart, initial_cart] = useState(0);
  useEffect(() => {
    const updatedCartItemsDescription = [];

    all_product.forEach((e) => {
      console.log(e._id, "i am here brother")
      if (cartItems[e.id] > 0) {
        let rentalPeriod = e.rentalPeriod; // Assuming rentalPeriod is already an object
        if (rentalPeriod) {
          rentalPeriod = {
            startDate: rentalPeriod.startDate, // Assuming startDate is a string
            endDate: rentalPeriod.endDate      // Assuming endDate is a string
          };
        }
        updatedCartItemsDescription.push({
          _id: e._id,
          id: e.id,
          image: `images/${e.image}`,
          name: e.name,
          new_price: `${e.new_price} $`,
          rental: e.isRental,
          rentalPeriod: rentalPeriod // Push modified rentalPeriod object
        });
      }
    });
    setCartItemsDescription(updatedCartItemsDescription);
    console.log(cartItemsDescription)
  }, []);


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
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>₹{e.new_price * cartItems[e.id]}</p>
                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
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
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          {/* <button onClick={checkoutHandler}>PROCEED TO CHECKOUT</button> */}
          <Checkout cartItemsDescription={cartItemsDescription} />
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
