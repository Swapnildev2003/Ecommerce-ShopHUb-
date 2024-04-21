import React from 'react';
import '../Sidebar/sidebar.css';
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from '../../assets/Product_list_icon.svg';

/**
 * Component for rendering the sidebar navigation.
 */
const Sidebar = () => {
    return (
        <div className='sidebar'>
            {/* Link to Add Product page */}
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className='sidebar-item'>
                    <img src={add_product_icon} alt='Add Product' />
                    <p>Add Product</p>
                </div>
            </Link>
            {/* Link to Product List page */}
            <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className='sidebar-item'>
                    <img src={list_product_icon} alt='Product List' />
                    <p>Product List</p>
                </div>
            </Link>
        </div>
    );
};

export default Sidebar;
