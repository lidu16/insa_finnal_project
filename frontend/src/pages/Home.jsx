// src/pages/Home.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import OrderForm from "../components/OrderForm.jsx"; // ✅ make sure the path is correct

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Fetch products from backend when the page loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">AAU Products</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:5000/${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-semibold text-green-600">${product.price}</p>
            <button
              onClick={() => setSelectedProduct(product)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {/* Order Form Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Order {selectedProduct.name}</h3>
            <OrderForm 
              product={selectedProduct} 
              onClose={() => setSelectedProduct(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
