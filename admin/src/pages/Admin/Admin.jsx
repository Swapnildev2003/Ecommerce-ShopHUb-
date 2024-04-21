import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Routes, Route } from "react-router-dom";
import AddProduct from '../../components/AddProduct/AddProduct';
import ListProduct from '../../components/ListProduct/ListProduct';
import './Admin.css';

/**
 * Component representing the admin dashboard.
 * Renders the sidebar navigation and routes to different admin pages.
 */
const Admin = () => {
    return (
        <div className='admin'>
            {/* Sidebar navigation */}
            <Sidebar />
            {/* Routes for different admin pages */}
            <Routes>
                {/* Route for adding a new product */}
                <Route path='/addproduct' element={<AddProduct />} />
                {/* Route for listing products */}
                <Route path='/listproduct' element={<ListProduct />} />
            </Routes>
        </div>
    );
};

export default Admin;

