// controllers/productController.js
import Product from "../models/productModel.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products from database
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// @desc    Add new product
// @route   POST /api/products
// @access  Admin
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, phone, bankAccount } = req.body;
    const image = req.file ? req.file.path : "";
    if (!name || !description || !price || !phone || !bankAccount || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newProduct = new Product({ name, description, price, phone, bankAccount, image });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

