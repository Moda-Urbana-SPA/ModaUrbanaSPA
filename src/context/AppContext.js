import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const makeSku = (p) => {
    const size = p.size || '';
    const color = p.color || '';
    return `${p.id}|${size}|${color}`;
  };

  const addToCart = (product) => {
    const skuKey = makeSku(product);
    setCartItems((prev) => {
      const existing = prev.find((p) => (p.skuKey || p.id) === skuKey);
      if (existing) {
        return prev.map((p) =>
          (p.skuKey || p.id) === skuKey ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, skuKey, quantity: 1 }];
    });
  };

  const removeFromCart = (idOrSku) => {
    setCartItems((prev) =>
      prev.filter((p) => (p.skuKey ? p.skuKey !== idOrSku : p.id !== idOrSku))
    );
  };

  const updateQuantity = (idOrSku, newQty) => {
    const qty = Number.isFinite(+newQty) ? Math.max(1, Math.floor(+newQty)) : 1;
    setCartItems((prev) =>
      prev.map((p) => {
        const match = p.skuKey ? p.skuKey === idOrSku : p.id === idOrSku;
        return match ? { ...p, quantity: qty } : p;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default AppProvider;
