import express from "express";
import multer from "multer";
import path from "path";
import { addProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// POST - Add product (with all fields)
router.post("/", upload.single("image"), addProduct);

// GET - All products
router.get("/", getProducts);

export default router;
