// backend/controllers/userController.js
const User = require("../models/User");

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Correct export
module.exports = getUsers; // ✅ Exporting the function directly
