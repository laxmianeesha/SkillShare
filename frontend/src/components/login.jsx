import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"
const login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (token && storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
                setLoggedInUser(userObj.username);
            } catch (err) {
                console.error("Error parsing user from localStorage:", err);
            }
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert("successful login")
            navigate("/")
        }
        catch (err) {
            alert(err.response?.data?.message || "Login failed")
        }
    }

    if (loggedInUser) {
        return (
            <div className="container">
                <div className="form-box">
                    <h2>Welcome Back!</h2>
                    <p style={{ margin: "20px 0", color: "#64748b", textAlign: "center" }}>
                        You are already logged in as <strong>{loggedInUser}</strong>.
                    </p>
                    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                        <button onClick={() => navigate("/")} style={{ width: "100%" }}>
                            Go to Home
                        </button>
                        <button 
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                setLoggedInUser(null);
                                window.location.reload();
                            }} 
                            style={{ width: "100%", backgroundColor: "#ef4444", marginTop: "10px" }}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="form-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange} />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange} />
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account?
                    <Link to="/signup"> Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default login