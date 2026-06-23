import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            console.log(res.data);

            localStorage.setItem("token", res.data.token);

            alert("Login Successful");
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 404) {
                alert("Account does not exist. Redirecting to registration page...");
                navigate("/register");
            } else {
                alert("Login Failed: " + (err.response?.data?.message || "Invalid credentials"));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </form>
    );
}

export default Login;