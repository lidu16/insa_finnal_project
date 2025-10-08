// orderRoutes.js
import express from "express";
import multer from "multer";
import Order from "../models/orderModel.js";

const router = express.Router();

// Multer setup for optional payment screenshot
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// POST /api/orders - create new order
router.post("/", upload.single("paymentScreenshot"), async (req, res) => {
  try {
    const { productId, productName, userCampus } = req.body;
    const paymentScreenshot = req.file ? req.file.path : null;

    const order = new Order({
      productId,
      productName,
      userCampus,
      paymentScreenshot
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders - get all orders (admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
