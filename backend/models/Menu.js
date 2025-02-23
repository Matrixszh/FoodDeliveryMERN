const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    total: Number,
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});
module.exports = mongoose.model("Order", orderSchema);
