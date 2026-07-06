import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom"
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Failed to parse stored user:", err);
            }
        } else if (token) {
            // Fallback: fetch profile from backend if user data is missing but token is present
            fetch("http://localhost:5000/api/auth/get", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    setUser(data.user);
                }
            })
            .catch(err => {
                console.error("Failed to fetch user data:", err);
            });
        }
    }, []);

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
                        {user ? (
                            <>
                                <span className="user-welcome">Hello, {user.username}</span>
                                <button
                                    className="btn-logout"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("user");
                                        window.location.reload();
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-login">
                                    Log In
                                </Link>

                                <Link to="/signup" className="btn-signup">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Navbar;