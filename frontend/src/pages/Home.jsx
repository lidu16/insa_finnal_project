// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import OrderForm from "../components/OrderForm";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">🎓 AAU Online Shop</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {product.image && (
              <img 
                src={`http://localhost:5000/${product.image}`} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-t-lg" 
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-green-600 font-bold text-lg mb-3">${product.price}</p>
              {product.phone && (
                <p className="text-gray-500 text-sm mb-1">📞 {product.phone}</p>
              )}
              {product.bankAccount && (
                <p className="text-gray-500 text-sm mb-3">🏦 {product.bankAccount}</p>
              )}
              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Form Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Order {selectedProduct.name}</h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <OrderForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
