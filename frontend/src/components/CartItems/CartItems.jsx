import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [cartItemsDescription, setCartItemsDescription] = useState([]);
  useEffect(() => {
    const updatedCartItemsDescription = [];

    all_product.forEach((e) => {
      if (cartItems[e.id] > 0) {
        updatedCartItemsDescription.push({
          id: e.id,
          image: `images/${e.image}`,
          name: e.name,
          new_price: `${e.new_price} $`,

        });
      }
    });
    setCartItemsDescription(updatedCartItemsDescription);
    console.log(cartItemsDescription)
  }, [cartItems]);
  const checkoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItemsDescription),
      });

      const result = await res.json()
      console.log(result)
      alert(result.response.Status + '\n' + result.response.Info);
      // const recent_log = await fetch("http://localhost:4000/recentlyAddedUser");

      // const response = await recent_log.json()
      // console.log(response)

    } catch (error) {
      console.error('Error during checkout:', error, "this is the error");

    }
  }

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
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
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
          <button onClick={checkoutHandler}>PROCEED TO CHECKOUT</button>
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
