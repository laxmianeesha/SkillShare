import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";

const Instructorver = () => {
    const [formData, setFormData] = useState({
        resume: "",
        github: "",
        linkedin: "",
        skills: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/verification/apply",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Verification request submitted successfully!");
            console.log(res.data);

            setFormData({
                resume: "",
                github: "",
                linkedin: "",
                skills: ""
            });

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="container">
            <div className="form-box">
                <h2>Instructor Verification</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="resume"
                        placeholder="Resume URL"
                        value={formData.resume}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="github"
                        placeholder="GitHub Profile"
                        value={formData.github}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn Profile"
                        value={formData.linkedin}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills (e.g. React, Node.js, MongoDB)"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Submit Verification
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Instructorver;