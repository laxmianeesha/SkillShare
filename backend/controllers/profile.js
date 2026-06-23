const Profile = require("../model/profile");
const User = require("../model/user");
const Verification = require("../model/verification");

async function createProfile(req, res) {
    try {
        const userId = req.user.id;
        const {
            fullName,
            headline,
            bio,
            about,
            linkedin,
            github,
            portfolio,
            certification,
            website,
            hourlyRate,
            availability,
            projects,
            education,
            achievements
        } = req.body;
        if (!userId || !hourlyRate || !fullName) {
            return res.status(400).json({
                success: false,
                message: "userId, hourlyRate, and fullName are required."
            });
        }
        const verificationDoc = await Verification.findOne({ instructorId: userId });

        const isApproved = verificationDoc && verificationDoc.status === "approved";

        const profileData = {
            userId,
            fullName,
            headline,
            bio,
            about,
            verificationStatus: verificationDoc ? verificationDoc.status : "pending",
            linkedin: isApproved ? (verificationDoc.linkedin || linkedin) : linkedin,
            github: isApproved ? (verificationDoc.github || github) : github,
            portfolio,
            certification,
            website,
            hourlyRate,
            availability,
            projects,
            education,
            achievements
        };

        let existingProfile = await Profile.findOne({ userId });

        if (existingProfile) {
            existingProfile = await Profile.findOneAndUpdate(
                { userId },
                { $set: profileData },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                profile: existingProfile
            });
        } else {
            const newProfile = await Profile.create(profileData);
            return res.status(201).json({
                success: true,
                message: "Profile created successfully",
                profile: newProfile
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}
async function getallmentors(req, res) {
    try {
        const mentors = await Profile.find(
            {
                verificationStatus: "approved"
            },
            {
                fullName: 1,
                ProfileImg: 1,
                headline: 1,
                bio: 1,
                skills: 1,
                hourlyRate: 1
            }
        )
        return res.status(200).json({
            success: true,
            total: mentors.length,
            mentors
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }
}

module.exports = { createProfile, getallmentors };
