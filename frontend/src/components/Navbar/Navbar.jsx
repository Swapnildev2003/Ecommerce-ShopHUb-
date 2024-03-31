import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo1.jpg";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="" />
        <p>ShopHub</p>
      </div>

      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shops")}}><Link style={{textDecoration:'none'}}  to='/'>Shop</Link>{menu === "shop" ?<hr/>:<></>} </li>

        <li onClick={() => { setMenu("men") }} ><Link style={{textDecoration:'none'}}  to="/mens">Mens </Link> {menu === "men"?<hr />:<></>}</li>

        <li onClick={() => { setMenu("women");}}><Link style={{textDecoration:'none'}} to="/womens">Womens</Link >{menu === "women"?<hr />:<></>}</li>

        <li onClick={() => {setMenu("kid");}}><Link style={{textDecoration:'none'}}  to="/kids">Kids</Link> {menu === "kid"?<hr />:<></>}</li>

        <li onClick={() => { setMenu("rent-dress-here");}}><Link  style={{textDecoration:'none'}} to="/rent-dress-here">Rent-Dress-Here </Link> {menu === "rent-dress-here"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link style={{textDecoration:'none'}} to="/login"><button>Login</button></Link>
        <Link style={{textDecoration:'none'}}  to="/cart"> <img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
