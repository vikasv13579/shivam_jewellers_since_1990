import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      cartCount: 0,

      // Add item to cart
      addToCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === product.id);

        let updatedCart;
        if (existingItem) {
          updatedCart = cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        } else {
          updatedCart = [...cartItems, { ...product, quantity: 1 }];
        }

        const newCount = updatedCart.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        );

        set({ cartItems: updatedCart, cartCount: newCount });

        // Also update localStorage for backward compatibility
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
      },

      // Remove item from cart
      removeFromCart: (productId) => {
        const { cartItems } = get();
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        const newCount = updatedCart.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        );

        set({ cartItems: updatedCart, cartCount: newCount });

        // Also update localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        const { cartItems } = get();
        const updatedCart = cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        const newCount = updatedCart.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        );

        set({ cartItems: updatedCart, cartCount: newCount });

        // Also update localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
      },

      // Clear cart
      clearCart: () => {
        set({ cartItems: [], cartCount: 0 });
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
      },

      // Get total price
      getTotalPrice: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (total, item) => total + item.price * (item.quantity || 1),
          0
        );
      },

      // Load cart from localStorage (for hydration)
      loadCart: () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        set({ cartItems: cart, cartCount: count });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartCount: state.cartCount,
      }),
    }
  )
);
