// backend/routes/adminRoutes.js
import express from "express";
import { loginAdmin, createDefaultAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/setup", createDefaultAdmin);

export default router;
