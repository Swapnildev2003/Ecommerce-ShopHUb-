import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';


/**
 * Component for rendering the navigation bar.
 */
const Navbar = () => {
    return (
        <div className='navbar'>
            {/* Logo */}
            <img src={navlogo} alt="Navigation Logo" className='nav-logo' />
            {/* Profile icon */}
            <img src={navProfile} alt='Navigation Profile' className='nav-profile' />
        </div>
    );
};

export default Navbar;
