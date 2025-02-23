const express = require("express");
const { getMenu, addMenuItem } = require("../controllers/menuController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/", getMenu);
router.post("/", authMiddleware, addMenuItem);
module.exports = router;