import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    const closeMenu = () => {
      setMenuOpen(false);
    };

  return (
    <nav className="navbar">
      <div className="name">Yonko Lozanov</div>
      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        <NavLink exact="true" to="/" activeClassName="active" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/projects" activeClassName="active" onClick={closeMenu}>
          Projects
        </NavLink>
        <NavLink to="/education" activeClassName="active" onClick={closeMenu}>
          Education
        </NavLink>
        <NavLink to="/blog" activeClassName="active" onClick={closeMenu}>
          Blog
        </NavLink>
        <NavLink to="/about" activeClassName="active" onClick={closeMenu}>
          About
        </NavLink>
        <NavLink to="/contact" activeClassName="active" onClick={closeMenu}>
          Contact
        </NavLink>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
