const Order = require("../models/Order");
exports.createOrder = async (req, res) => {
    const { items, total } = req.body;
    const order = new Order({ user: req.user._id, items, total });
    await order.save();
    res.json({ message: "Order placed" });
};
exports.getOrders = async (req, res) => {
    const orders = await Order.find().populate("user").populate("items");
    res.json(orders);
};

