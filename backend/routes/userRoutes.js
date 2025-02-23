const express = require("express");
const getUsers = require("../controllers/userController"); // ✅ Correct import

const router = express.Router();

router.get("/", getUsers);

module.exports = router;
