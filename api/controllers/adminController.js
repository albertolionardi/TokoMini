
const client = require('../../dbClient');

const adminController = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const result = await client.query("SELECT * FROM admins WHERE email = $1", [email]);
      const admin = result.rows[0];
      if (!admin) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      console.log("Admin Logged in:", admin);
      if (admin.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res.json({
        admin: {
          name: admin.name,
          email: admin.email,
        },
      });
    } catch (err) {
      console.log("Error in login:", err);
      next(err);
    }
  },
};

module.exports = adminController;