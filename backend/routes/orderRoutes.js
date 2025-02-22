const express = require("express");
const { authenticateUser, isAdmin, isManagerOrAdmin } = require("../middleware/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

// ✅ User: Place an order
router.post("/", authenticateUser, async (req, res) => {
    const { items, totalAmount } = req.body;
    const order = new Order({ user: req.user._id, items, totalAmount, status: "pending" });
    await order.save();
    res.json({ message: "Order placed successfully", order });
});

// ✅ Admin & Manager: View all orders
router.get("/", authenticateUser, isManagerOrAdmin, async (req, res) => {
    const orders = await Order.find().populate("user", "username");
    res.json(orders);
});

// ✅ Admin & Manager: Update order status
router.put("/:id", authenticateUser, isManagerOrAdmin, async (req, res) => {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ message: "Order status updated successfully", updatedOrder });
});

module.exports = router;
