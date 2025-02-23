const Menu = require("../models/Menu");
exports.getMenu = async (req, res) => {
    const menu = await Menu.find();
    res.json(menu);
};
exports.addMenuItem = async (req, res) => {
    const { name, price, category } = req.body;
    const menuItem = new Menu({ name, price, category });
    await menuItem.save();
    res.json({ message: "Menu item added" });
};
