import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { createCheckoutSession } from '../api';

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    totalQty,
    removeFromCart,
    updateQty,
    setShowCart,
    clearCart,
    user,
  } = useStateContext();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const payload = {
        cartItems: cartItems.map(({ _id, quantity }) => ({ _id, quantity })),
        userId: user ? user._id : null,
      };
      const { data } = await createCheckoutSession(payload);
      clearCart();
      // Redirect to Stripe hosted checkout
      window.location.href = data.url;
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Checkout failed. Please try again.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setShowCart(false)}
      />

      {/* Drawer */}
      <div className="relative z-10 bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">
            Your Cart{' '}
            <span className="text-primary">({totalQty} items)</span>
          </h2>
          <button
            onClick={() => setShowCart(false)}
            className="hover:text-primary transition-colors"
            aria-label="Close cart"
          >
            <AiOutlineClose size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <MdOutlineRemoveShoppingCart size={64} />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button
                className="btn-primary"
                onClick={() => {
                  setShowCart(false);
                  navigate('/');
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl bg-gray-100"
                />
                <div className="flex flex-col flex-1 gap-1">
                  <p className="font-semibold text-sm leading-tight">
                    {item.name}
                  </p>
                  <p className="text-primary font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  {/* Qty controls */}
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      onClick={() => updateQty(item._id, 'dec')}
                      className="border border-gray-300 rounded-full p-1 hover:border-primary hover:text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <AiOutlineMinus size={14} />
                    </button>
                    <span className="w-5 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item._id, 'inc')}
                      className="border border-gray-300 rounded-full p-1 hover:border-primary hover:text-primary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <AiOutlinePlus size={14} />
                    </button>
                  </div>
                </div>
                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-400 hover:text-primary transition-colors self-start pt-1"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <AiOutlineClose size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-4 border-t space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="btn-primary w-full py-3 text-base"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
