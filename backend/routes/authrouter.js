const express = require("express");
const authrouter = express.Router();
const multer = require("multer");

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

const authcontroller = require("../controllers/authcontroller")
const Instructor = require("../controllers/verification")
const Profile = require("../controllers/profile")
/* post auth/api/register */
authrouter.post("/register", authcontroller.register)
authrouter.get("/get", authcontroller.auth, authcontroller.getAll);
authrouter.post("/login", authcontroller.login);
authrouter.post("/apply", authcontroller.auth, upload.single("resume"), Instructor.apply);
authrouter.post("/create", authcontroller.auth, Profile.createProfile)
authrouter.get("/mentor", Profile.getallmentors)
authrouter.get("/allusers", authcontroller.getAllUsers);
module.exports = authrouter;