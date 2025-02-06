const client = require('../dbClient');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req,res,next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
      }
    try {
        const decoded = jwt.verify(token, process.env.secret);
        const result = await client.query("SELECT * FROM admins WHERE adminid = $1 AND token = $2", [decoded.id, token]);
        const admin = result.rows[0];

        if (!admin) {
            return res.status(401).json({ message: "Invalid token." });
        }

        req.admin = admin;
        next();
    } catch (err) {
        console.log("Error in token validation:", err);
        return res.status(401).json({ message: "Invalid token." });
    }
}

module.exports = authMiddleware