import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useStateContext } from '../context/StateContext';
import Cart from './Cart';

const Navbar = () => {
  const { showCart, setShowCart, totalQty, user, logout } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
          HMS<span className="text-gray-700">Store</span>
        </Link>

        {/* Nav actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-gray-600 font-medium">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors"
                aria-label="Logout"
              >
                <FiLogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <FiUser size={18} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

          {/* Cart button */}
          <button
            className="relative p-2 hover:text-primary transition-colors"
            onClick={() => setShowCart(true)}
            aria-label="Open cart"
          >
            <AiOutlineShopping size={26} />
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>
        </div>
      </div>

      {showCart && <Cart />}
    </header>
  );
};

export default Navbar;
