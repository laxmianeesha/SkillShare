const usermodel = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }
        const ifexists = await usermodel.findOne({
            $or: [
                { email }, { username }
            ]
        });
        if (ifexists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await usermodel.create({
            username,
            email,
            password: hashedpassword,
            role
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(201).json({
            success: true,
            message: "user registered successfully",
            user: {
                username: user.username,
                email: user.email
            },
            token
        });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign(
            { id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        }
        )

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                username: user.username,
                email: user.email
            }
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};


async function getAll(req, res) {
    try {
        const user = await usermodel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}
async function getAllUsers(req, res) {
    try {
        const users = await usermodel.find();

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    register, login, getAll, auth, getAllUsers
};
