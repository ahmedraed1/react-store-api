import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/create-payment-intent",
        {
          items: cart.items,
        }
      );
      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment Succeeded!");
          clearCart();
          navigate("/success");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred.", error);
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    /* ... (same as before) */
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      <div className="mb-4 p-3 border rounded-md">
        <CardElement options={cardElementOptions} />
      </div>

      {/* Display payment errors */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-500 text-white py-3 rounded-md text-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
