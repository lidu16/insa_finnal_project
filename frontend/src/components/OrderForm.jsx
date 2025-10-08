import { useState } from "react";
import axios from "axios";

function OrderForm({ product, onClose }) {
  const [userCampus, setUserCampus] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("productId", product._id);
    formData.append("productName", product.name);
    formData.append("userCampus", userCampus);
    if (screenshot) formData.append("paymentScreenshot", screenshot);

    try {
      const res = await axios.post("http://localhost:5000/api/orders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMsg("✅ Order placed successfully!");
      console.log(res.data);
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error(err);
      setSuccessMsg("❌ Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Order {product.name}</h2>
        {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Select Campus</label>
          <select
            required
            value={userCampus}
            onChange={(e) => setUserCampus(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          >
            <option value="">-- Choose Campus --</option>
            <option value="4 Killo">4 Killo</option>
            <option value="5 Killo">5 Killo</option>
            <option value="6 Killo">6 Killo</option>
            <option value="FBE">FBE</option>
          </select>

          <label className="block mb-2">Payment Screenshot (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setScreenshot(e.target.files[0])}
            className="mb-3 w-full"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
