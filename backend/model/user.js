const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must contain at least 8 characters"]
    },

    role: {
        type: String,
        enum: ["learner", "instructor"],
        default: "learner"
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);