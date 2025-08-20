import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Import the context

const Header = () => {
  const { cart } = useContext(CartContext);

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">
          T-Shirt Store 👕
        </Link>
        <nav>
          <Link to="/" className="px-4 hover:text-gray-300">
            Home
          </Link>

          <Link to="/cart" className="px-4 hover:text-gray-300">
            Cart ({totalItems})
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
