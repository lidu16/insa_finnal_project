// orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    userCampus: { 
        type: String, 
        enum: ["4 Killo", "5 Killo", "6 Killo", "FBE"], 
        required: true 
    },
    paymentScreenshot: { type: String }, // optional
    paymentStatus: { 
        type: String, 
        enum: ["pending", "verified", "pay on delivery"], 
        default: "pending" 
    },
    deliveryStatus: { 
        type: String, 
        enum: ["pending", "delivered"], 
        default: "pending" 
    },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
