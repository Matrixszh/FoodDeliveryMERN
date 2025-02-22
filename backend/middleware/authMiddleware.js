const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
}

function admin(req, res, next) {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admin access only" });
    next();
}

function adminOrManager(req, res, next) {
    if (!["admin", "manager"].includes(req.user.role)) return res.status(403).json({ error: "Access denied" });
    next();
}

module.exports = { auth, admin, adminOrManager };
