const client = require('../dbClient');
const jwt = require('jsonwebtoken');

const userAuthMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.secret);
        if (decoded.role !== 'user') {
            return res.status(403).json({ message: "Access denied. Users only." });
        }
        const query = "SELECT * FROM users WHERE userid = $1 AND token = $2";
        const result = await client.query(query, [decoded.userid, token]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: "Invalid token." });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error in user token validation:", err);
        return res.status(401).json({ message: "Invalid token." });
    }
}
module.exports = userAuthMiddleware