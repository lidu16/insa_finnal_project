// backend/controllers/adminController.js
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Create JWT token
    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, admin: { username: admin.username } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDefaultAdmin = async (req, res) => {
  try {
    const exists = await Admin.findOne({ username: "lidu" });
    if (exists) return res.json({ message: "Default admin already exists" });
    const admin = new Admin({ username: "lidu", password: "lidu123" });
    await admin.save();
    res.json({ message: "Default admin created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
