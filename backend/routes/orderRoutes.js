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

// GET /api/orders/:id - get single order by id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/orders/:id/verify - mark order payment as verified (admin accept)
router.put("/:id/verify", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { paymentStatus: "verified" } },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
