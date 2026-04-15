import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
} from 'react-icons/ai';
import { getProductBySlug } from '../api';
import { useStateContext } from '../context/StateContext';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, setShowCart } = useStateContext();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getProductBySlug(slug);
        setProduct(data);
      } catch {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setShowCart(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">{error || 'Product not found.'}</p>
        <button
          className="btn-primary mt-6"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Back */}
      <button
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-8 transition-colors"
        onClick={() => navigate(-1)}
      >
        <AiOutlineLeft />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 flex-wrap">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-5">
          {product.category && (
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {product.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {product.name}
          </h1>
          <p className="text-3xl font-black text-primary">
            ${product.price.toFixed(2)}
          </p>

          {product.description && (
            <div>
              <h3 className="font-semibold mb-1">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {product.details && (
            <div>
              <h3 className="font-semibold mb-1">Details</h3>
              <p className="text-gray-600 leading-relaxed">{product.details}</p>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <AiOutlineMinus />
              </button>
              <span className="px-4 py-2 font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="btn-outline" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                handleAddToCart();
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
