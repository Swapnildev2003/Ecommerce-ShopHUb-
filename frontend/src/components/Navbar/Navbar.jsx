import React, { useContext, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/logo1.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png"

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();
const dropdown_toggle = (e)=>{
 menuRef.current.classList.toggle('nav-menu-visible');
e.target.classList.toggle('open');
}

  return (
   <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="" />
        <p>ShopHub</p>
      </div>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shops")}}><Link style={{textDecoration:'none'}}  to='/'>Shop</Link>{menu === "shop" ?<hr/>:<></>} </li>

        <li onClick={() => { setMenu("men") }} ><Link style={{textDecoration:'none'}}  to="/mens">Men</Link> {menu === "men"?<hr />:<></>}</li>

        <li onClick={() => { setMenu("women");}}><Link style={{textDecoration:'none'}} to="/womens">Women</Link >{menu === "women"?<hr />:<></>}</li>

        <li onClick={() => {setMenu("kid");}}><Link style={{textDecoration:'none'}}  to="/kids">Kids</Link> {menu === "kid"?<hr />:<></>}</li>

        <li onClick={() => { setMenu("rent-dress-here");}}><Link  style={{textDecoration:'none'}} to="/rent-dress-here">Rent-Dress-Here </Link> {menu === "rent-dress-here"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link style={{textDecoration:'none'}} to="/login"><button>Login</button></Link>
        <Link style={{textDecoration:'none'}}  to="/cart"> <img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
      </div>
  );
};

export default Navbar;
