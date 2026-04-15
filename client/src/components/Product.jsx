import { Link } from 'react-router-dom';
import { useStateContext } from '../context/StateContext';

const Product = ({ product }) => {
  const { addToCart } = useStateContext();

  return (
    <div className="product-card group">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <h3 className="font-semibold text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-1">
          {product.category}
        </p>
        <p className="text-primary font-bold mt-1">
          ${product.price.toFixed(2)}
        </p>
      </Link>
      <button
        className="btn-primary w-full mt-2 py-2 text-sm"
        onClick={(e) => {
          e.preventDefault();
          addToCart(product, 1);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
