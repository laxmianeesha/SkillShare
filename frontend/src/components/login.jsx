import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"
const login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
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
            localStorage.setItem("token", res.data.token)
            alert("successful login")
            navigate("/")
        }
        catch (err) {
            alert(err.response.data.message)
        }
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