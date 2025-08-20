import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeItem, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="px-3 py-1 text-lg"
          >
            -
          </button>
          <span className="px-4 py-1">{item.quantity}</span>
          <button
            onClick={() => increaseQuantity(item.id)}
            className="px-3 py-1 text-lg"
          >
            +
          </button>
        </div>
        <p className="font-semibold w-20 text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CartItem;
