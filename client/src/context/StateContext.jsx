import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const StateContext = createContext(null);

export const StateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hms_cart') || '[]');
    } catch {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hms_user') || 'null');
    } catch {
      return null;
    }
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem('hms_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist user
  useEffect(() => {
    localStorage.setItem('hms_user', JSON.stringify(user));
  }, [user]);

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i._id === product._id);
      if (exists) {
        return prev.map((i) =>
          i._id === product._id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((i) => i._id !== productId));
    toast.success('Item removed from cart');
  };

  const updateQty = (productId, type) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i._id !== productId) return i;
          const newQty = type === 'inc' ? i.quantity + 1 : i.quantity - 1;
          return { ...i, quantity: newQty };
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('hms_cart');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hms_user');
    toast.success('Logged out');
  };

  return (
    <StateContext.Provider
      value={{
        cartItems,
        totalQty,
        totalPrice,
        showCart,
        setShowCart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error('useStateContext must be used within StateProvider');
  return ctx;
};
