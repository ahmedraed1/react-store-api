import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="text-center container mx-auto p-8 flex flex-col items-center justify-center h-[60vh]">
      <svg
        className="w-24 h-24 text-green-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Thank you for your order. We have received your payment and will process
        your order shortly.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg hover:bg-blue-600"
      >
        Back to Homepage
      </Link>
    </div>
  );
};

export default SuccessPage;
