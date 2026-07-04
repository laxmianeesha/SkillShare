import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.css'

const Signup = () => {
    return (
        <div className="container">
            <div className="form-box">
                <h2>Create Account</h2>
                <form>
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account?
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup