import React, { useState } from 'react'
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
            alert("User registered successfully")
            navigate("/")
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed")
        }
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