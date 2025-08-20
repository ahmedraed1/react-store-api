import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white cursor-pointer">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="mt-2 text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
