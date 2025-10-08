// productRoutes.js
import express from "express";
import Product from "../models/productModel.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// @route POST /api/products
// @desc Add new product (admin)
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { name, description, price, phone, bankAccount } = req.body;
        const image = req.file ? req.file.path : null;

        if (!image) return res.status(400).json({ message: "Image is required" });

        const product = new Product({ name, description, price, phone, bankAccount, image });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/products
// @desc Get all products (users)
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
