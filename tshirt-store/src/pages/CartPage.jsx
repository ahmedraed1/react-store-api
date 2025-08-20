import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  const cartTotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.items.length === 0) {
    return (
      <div className="text-center container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg hover:bg-blue-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-semibold border-b pb-4">
            Order Summary
          </h2>
          <div className="flex justify-between items-center my-4">
            <span className="font-medium text-gray-600">Subtotal</span>
            <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="text-center w-full bg-blue-500 text-white py-3 rounded-md text-lg hover:bg-blue-600 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
