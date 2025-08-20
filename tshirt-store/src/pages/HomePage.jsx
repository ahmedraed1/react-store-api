import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (isLoading) {
    return (
      <div className="text-center text-2xl mt-12">Loading products...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl mt-12">{error}</div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="text-center my-12">
        <h2 className="text-4xl font-bold mb-4">Our Exclusive Collection</h2>
        <p className="text-lg text-gray-600">
          Discover our high-quality t-shirts, designed for comfort and style.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
