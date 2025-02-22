const express = require("express");
const { authenticateUser, isAdmin, isManagerOrAdmin } = require("../middleware/authMiddleware");
const Menu = require("../models/Menu");

const router = express.Router();

// ✅ Public: Get all menu items (Anyone can access)
router.get("/", async (req, res) => {
    const menuItems = await Menu.find();
    res.json(menuItems);
});

// ✅ Admin: Add a menu item
router.post("/", authenticateUser, isAdmin, async (req, res) => {
    const { name, category, price, availability } = req.body;
    const menuItem = new Menu({ name, category, price, availability });
    await menuItem.save();
    res.json({ message: "Menu item added successfully", menuItem });
});

// ✅ Admin & Manager: Update a menu item
router.put("/:id", authenticateUser, isManagerOrAdmin, async (req, res) => {
    const { name, category, price, availability } = req.body;
    const updatedItem = await Menu.findByIdAndUpdate(req.params.id, { name, category, price, availability }, { new: true });
    res.json({ message: "Menu item updated successfully", updatedItem });
});

// ✅ Admin: Delete a menu item
router.delete("/:id", authenticateUser, isAdmin, async (req, res) => {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted successfully" });
});

module.exports = router;
