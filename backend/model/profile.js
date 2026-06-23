const mongoose = require("mongoose")
const mentorProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        res: "User",
        required: true,
        unique: true
    },
    fullName: String,
    ProfileImg: String,
    headline: String,
    bio: String,
    about: String,
    verificationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    linkedin: String,
    github: String,
    portfolio: String,
    certification: String,
    website: String,
    hourlyRate: Number,
    availability: {
        monday: [{
            start: String,
            end: String
        }],
        tuesday: [{
            start: String,
            end: String
        }],
        wednesday: [{
            start: String,
            end: String
        }],
        thursday: [{
            start: String,
            end: String
        }],
        friday: [{
            start: String,
            end: String
        }],
        saturday: [{
            start: String,
            end: String
        }],
        sunday: [{
            start: String,
            end: String
        }]
    },

    projects: [{
        title: String,
        description: String,
        githubLink: String,
        demoLink: String
    }],

    education: [{
        institution: String,
        degree: String,
        year: String
    }],

    achievements: [{
        title: String,
        description: String
    }],

    totalStudents: {
        type: Number,
        default: 0
    },

    totalSessions: {
        type: Number,
        default: 0
    },

    averageRating: {
        type: Number,
        default: 0
    },

    totalReviews: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("MentorProfile", mentorProfileSchema);