import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const ProductDetailPage = () => {
  const { addItem } = useContext(CartContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Product not found or an error occurred.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      alert(`${product.name} has been added to the cart!`);
    }
  };

  if (isLoading) {
    return <div className="text-center text-2xl mt-12">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-500 text-2xl mt-12">{error}</div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-light text-gray-800 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 text-white py-3 rounded-md text-lg hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
