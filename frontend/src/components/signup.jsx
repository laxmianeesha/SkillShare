import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/login.css'

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "learner"
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
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!")
            return
        }
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                }
            )
            console.log(res.data)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            alert("User registered successfully")
            navigate("/")
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed")
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
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="learner">Learner</option>
                        <option value="instructor">Instructor</option>
                    </select>
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account?
                    <Link to="/login"> Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup