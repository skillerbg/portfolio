// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // import the Navbar.css file

const Navbar = () => {


    return (
        <nav className="navbar">
            <div className="name">Yonko Lozanov</div>
            <div className="nav-links">
                <NavLink exact="true" to="/" activeclassname="active">Home</NavLink>
                <NavLink to="/projects" activeclassname="active">Projects</NavLink>
                <NavLink to="/education" activeclassname="active">Education</NavLink>
                <NavLink to="/blog" activeclassname="active">Blog</NavLink>
                <NavLink to="/about" activeclassname="active">About</NavLink>
                <NavLink to="/contact" activeclassname="active">Contact</NavLink>
            </div>
        </nav>
    );
};
const styles = {
    navStyle: {
        
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
        width: '100%',

    },
    navLinksStyle: {
        padding: '1rem',
        paddingRight: '5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
        maxWidth: '50%',
    },
    nameStyle: {
        paddingLeft: '5rem',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        color: 'white',
    },
};

export default Navbar;