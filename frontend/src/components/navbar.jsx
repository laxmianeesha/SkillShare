import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom"
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar-container">

                <Link to="/" className="navbar-logo">
                    <svg
                        className="logo-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M12 2L2 12L12 22L22 12L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M12 2V22"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>

                    <span className="logo-text">
                        Skill<span>Share</span>
                    </span>
                </Link>

                <button
                    className={`hamburger ${isMenuOpen ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`navbar-menu-wrapper ${isMenuOpen ? "active" : ""}`}>

                    <nav className="nav-center">
                        <ul className="nav-list">
                            <li><a href="#courses" className="nav-link">Courses</a></li>
                            <li><a href="#mentorship" className="nav-link">Mentorship</a></li>
                            <li><a href="#instructors" className="nav-link">Instructors</a></li>
                            <li><a href="#pricing" className="nav-link">Pricing</a></li>
                        </ul>
                    </nav>

                    <div className="navbar-actions">
                        <Link to="/login" className="btn-login">Log In</Link>
                        <Link to="/signup" className="btn-signup">Sign Up</Link>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Navbar;