import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AAU Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="w-full h-48 object-cover mb-2"/>
            <h2 className="font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price} ETB</p>
            <p>Phone: {product.phone}</p>
            <p>Bank: {product.bankAccount}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
