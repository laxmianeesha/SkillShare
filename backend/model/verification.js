// const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");
const verificationSchema = new mongoose.Schema({
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
    skills: [{
        type: String
    }],
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }

}, { timestamps: true });
module.exports = mongoose.model(
    "Verification", verificationSchema
);