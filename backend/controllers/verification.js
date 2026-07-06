const Verification = require("../model/verification.js");

async function apply(req, res) {
    try {
        const { resume, linkedin, github, skills } = req.body;
        const resumePath = req.file ? req.file.path : resume;

        if (!resumePath || !skills) {
            return res.status(400).json({
                success: false,
                message: "Requires skills and resume (either as a file upload or text/URL)"
            });
        }
        const newVerification = await Verification.create({
            instructorId: req.user.id,
            resume: resumePath,
            linkedin,
            github,
            skills
        });
        console.log("Successfully saved verification record in DB:", newVerification);
        return res.status(200).json({
            success: true,
            message: "apply successfully",
            verification: newVerification
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: err.message
        });
    }
}
module.exports = { apply };