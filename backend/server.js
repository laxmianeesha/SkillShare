const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authrouter = require("./routes/authrouter")
const app = express();
app.use(cors());
app.use(express.json())
//middleware

app.use("/api/auth", authrouter);
app.use("/api/verification", authrouter);
app.use("/profile", authrouter);


//mongodb connection
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((err) => {
        console.log("db not connected:", err.message);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});