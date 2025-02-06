const client = require('../dbClient');
const jwt = require('jsonwebtoken');

const adminAuthMiddleware = async (req,res,next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
      }
    try {
        const decoded = jwt.verify(token, process.env.secret);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        const query = "SELECT * FROM admins WHERE adminid = $1 AND token = $2";
        const result = await client.query(query, [decoded.id, token]);
        const admin = result.rows[0];

        if (!admin) {
            return res.status(401).json({ message: "Invalid token." });
        }
        next();
    } catch (err) {
        console.log("Error in token validation:", err);
        return res.status(401).json({ message: "Invalid token." });
    }
}

module.exports = adminAuthMiddleware