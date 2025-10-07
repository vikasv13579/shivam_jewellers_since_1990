# Zustand State Management

This directory contains all Zustand stores for global state management.

## 📦 Stores

### 1. **Search Store** (`search-store.js`)

Manages search state across the application, primarily between Header and Dashboard components.

#### State
- `searchQuery` (string) - Current search query
- `isSearchActive` (boolean) - Whether a search is active

#### Actions
- `setSearchQuery(query)` - Update search query
- `clearSearch()` - Clear search query and reset state

#### Usage Example
```javascript
import { useSearchStore } from '@/store/search-store';

function MyComponent() {
  const { searchQuery, setSearchQuery, clearSearch } = useSearchStore();

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={clearSearch}>Clear</button>
    </div>
  );
}
```

---

### 2. **Cart Store** (`cart-store.js`)

Manages shopping cart state with persistence using localStorage.

#### State
- `cartItems` (array) - List of products in cart
- `cartCount` (number) - Total number of items in cart

#### Actions
- `addToCart(product)` - Add a product to cart (or increase quantity)
- `removeFromCart(productId)` - Remove a product from cart
- `updateQuantity(productId, quantity)` - Update product quantity
- `clearCart()` - Clear all items from cart
- `getTotalPrice()` - Calculate total cart value
- `loadCart()` - Load cart from localStorage (hydration)

#### Usage Example
```javascript
import { useCartStore } from '@/store/cart-store';

function ProductCard({ product }) {
  const { addToCart, cartCount } = useCartStore();

  return (
    <div>
      <h3>{product.title}</h3>
      <button onClick={() => addToCart(product)}>
        Add to Cart ({cartCount})
      </button>
    </div>
  );
}
```

---

## 🔄 Data Flow

### Search Flow
```
Header (Search Input)
    ↓
Search Store (setSearchQuery)
    ↓
Dashboard Page (reads searchQuery)
    ↓
DashboardCards (filters products)
```

### Cart Flow
```
Product Card (Add to Cart)
    ↓
Cart Store (addToCart)
    ↓
Header (displays cartCount)
    ↓
Checkout Page (reads cartItems)
```

---

## 🎯 Benefits

1. **Centralized State** - Single source of truth for search and cart
2. **No Prop Drilling** - Access state from any component
3. **Persistence** - Cart automatically persists to localStorage
4. **Type Safety** - Easy to add TypeScript later
5. **Performance** - Only re-renders components that use changed state
6. **DevTools** - Zustand has great browser DevTools support

---

## 🚀 Future Enhancements

- Add user store for authentication state
- Add wishlist store for liked products
- Add filters store for product filtering
- Add TypeScript types
- Add middleware for analytics
