import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { CartContext } from "../context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);

  const cartTotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-semibold border-b pb-4">
            Order Summary
          </h2>
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center my-2"
            >
              <span className="text-gray-600">
                {item.name} x {item.quantity}
              </span>
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center my-4 pt-4 border-t">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
