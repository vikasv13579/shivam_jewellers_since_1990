// src/components/dashboard/header/header.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AuthModal from "@/components/auth-modal";
import {
  Search,
  LogOut,
  Mail,
  UserPlus,
  Sparkles,
  ShoppingCart,
  X,
  Trash2,
  ArrowRight,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { searchProducts } from "@/data/jewellery-products";
import { useSearchStore } from "@/store/search-store";

export default function Header() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  // Zustand store for search
  const {
    searchQuery,
    setSearchQuery: setStoreSearchQuery,
    clearSearch,
  } = useSearchStore();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [redirectTo, setRedirectTo] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load cart items from localStorage
    loadCartItems();

    // Listen for storage changes (when items are added to cart)
    const handleStorageChange = () => {
      loadCartItems();
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event when cart is updated in same tab
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    setCartCount(cart.reduce((total, item) => total + (item.quantity || 1), 0));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setCartCount(
      updatedCart.reduce((total, item) => total + (item.quantity || 1), 0)
    );

    // Dispatch custom event
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleAuthClick = (mode, redirectUrl = null) => {
    setAuthMode(mode);
    setRedirectTo(redirectUrl);
    setShowAuthModal(true);
  };

  const handleContactClick = () => {
    if (!currentUser) {
      handleAuthClick("login", "/contact");
    } else {
      router.push("/contact");
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setStoreSearchQuery(query);

    if (query.trim().length >= 2) {
      const results = searchProducts(query);
      setSearchResults(results.slice(0, 8)); // Show max 8 results
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Close search dropdown and navigate to dashboard
      setShowSearchResults(false);
      // Navigate to dashboard if not already there
      if (window.location.pathname !== "/dashboard") {
        router.push("/dashboard");
      }
    }
  };

  const handleProductClick = (product) => {
    // Set search to product category to show related products
    setStoreSearchQuery(product.category);
    setShowSearchResults(false);

    // Navigate to dashboard if not already there
    if (window.location.pathname !== "/dashboard") {
      router.push("/dashboard");
    }
  };

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`w-full backdrop-blur-xl border-b transition-all duration-500 ${
        scrolled
          ? "bg-white/98 shadow-xl border-amber-200/50"
          : "bg-white/95 shadow-lg border-gray-200/50"
      }`}
    >
      {/* Main Header Content */}
      <div className="h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo - SJ for Shivam Jewellers */}
        <Link href="/dashboard" className="group flex-shrink-0 relative">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Rotating ring behind logo */}
              <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 border-amber-300/20 group-hover:border-amber-400/40 transition-all duration-500 group-hover:rotate-180"></div>

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 flex items-center justify-center relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Radial glow */}
                <div className="absolute inset-0 bg-gradient-radial from-yellow-200/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* SJ Letters */}
                <span className="text-2xl sm:text-3xl font-extrabold text-white relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  SJ
                </span>
              </div>

              {/* Multiple sparkle effects */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse shadow-lg"></div>
              <div
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-md"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <Sparkles
                className="absolute -top-2 -left-2 w-4 h-4 text-amber-400 animate-pulse opacity-70"
                style={{ animationDelay: "0.3s" }}
              />
            </div>

            {/* Brand Name */}
            <div className="hidden sm:flex flex-col">
              <h1 className="text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent group-hover:from-amber-600 group-hover:via-yellow-500 group-hover:to-amber-500 transition-all duration-500 tracking-tight">
                Shivam Jewellers
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-0.5 w-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full group-hover:w-12 transition-all duration-500"></div>
                <span className="text-[10px] lg:text-xs font-semibold text-amber-700/80 uppercase tracking-widest">
                  Since 1990
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Global Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-2xl relative"
          ref={searchRef}
        >
          <div
            className={`relative transition-all duration-500 ${
              isSearchFocused ? "scale-105" : "scale-100"
            }`}
          >
            <div
              className={`absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-xl opacity-0 blur transition-all duration-500 ${
                isSearchFocused ? "opacity-20" : ""
              }`}
            ></div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                setIsSearchFocused(true);
                // Automatically show results if there's a search query
                if (searchQuery.trim().length >= 2) {
                  const results = searchProducts(searchQuery);
                  setSearchResults(results.slice(0, 8));
                  setShowSearchResults(true);
                }
              }}
              onBlur={() => {
                setIsSearchFocused(false);
              }}
              placeholder="Search for jewellery, collections, designs..."
              className={`relative w-full px-4 py-2.5 sm:py-3 pl-11 pr-4 rounded-xl border-2 transition-all duration-500 text-sm sm:text-base bg-white ${
                isSearchFocused
                  ? "border-amber-400 ring-4 ring-amber-100 shadow-lg"
                  : "border-gray-200 hover:border-amber-300 shadow-sm"
              }`}
            />
            <Search
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                isSearchFocused ? "text-amber-500 scale-110" : "text-gray-400"
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  clearSearch();
                  setSearchResults([]);
                  setShowSearchResults(false);
                  setIsSearchFocused(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] max-h-96 overflow-y-auto animate-slide-down">
              <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-yellow-50">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-700">
                    Found {searchResults.length} result
                    {searchResults.length !== 1 ? "s" : ""}
                  </p>
                  <span className="text-xs text-gray-500 italic">
                    Click to view similar
                  </span>
                </div>
              </div>
              <div className="p-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="group flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 rounded-xl cursor-pointer transition-all duration-300 border border-transparent hover:border-amber-200"
                    title={`View all ${product.category} products`}
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Category indicator on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1">
                        <span className="text-white text-xs font-bold">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-amber-700 transition-colors">
                        {product.title}
                      </h4>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded group-hover:bg-amber-100 transition-colors">
                          {product.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {product.purity} • {product.weight}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <div className="flex items-center gap-0.5 ml-auto">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* View Similar indicator */}
                    <div className="flex-shrink-0 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-col items-center gap-1">
                        <ArrowRight className="w-5 h-5" />
                        <span className="text-xs font-semibold whitespace-nowrap">
                          View Similar
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {searchResults.length >= 8 && (
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={() => {
                      setShowSearchResults(false);
                      router.push(
                        `/dashboard?search=${encodeURIComponent(searchQuery)}`
                      );
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    <span>View All Results</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* No Results Message */}
          {showSearchResults &&
            searchQuery.trim().length >= 2 &&
            searchResults.length === 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] p-8 text-center animate-slide-down">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold mb-1">
                  No products found
                </p>
                <p className="text-sm text-gray-400">
                  Try searching with different keywords
                </p>
              </div>
            )}
        </form>

        {/* Right Side - Cart, Contact, and Login */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Shopping Cart Button */}
          <div className="relative">
            <button
              onClick={() => setShowCart(!showCart)}
              className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </div>
              )}
              <span className="hidden lg:inline text-sm font-semibold text-amber-700">
                Cart
              </span>
            </button>

            {/* Cart Dropdown */}
            {showCart && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowCart(false)}
                ></div>
                <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-slide-down max-h-[500px] overflow-hidden">
                  {/* Cart Header */}
                  <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-yellow-600 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                      <ShoppingCart className="w-5 h-5" />
                      <h3 className="font-bold text-lg">
                        Shopping Cart ({cartCount})
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowCart(false)}
                      className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-300"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  {cartItems.length === 0 ? (
                    <div className="p-8 text-center">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-semibold mb-2">
                        Your cart is empty
                      </p>
                      <p className="text-sm text-gray-400">
                        Add some beautiful jewellery!
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="group relative bg-gradient-to-br from-amber-50/50 to-yellow-50/50 rounded-xl p-3 border border-amber-100 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex gap-3">
                              {/* Product Image */}
                              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-gray-500 mb-1">
                                  {item.purity} • {item.weight}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-amber-700">
                                    {formatPrice(item.price)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Qty: {item.quantity || 1}
                                  </span>
                                </div>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="absolute top-2 right-2 w-7 h-7 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cart Footer */}
                      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-700 font-semibold">
                            Total:
                          </span>
                          <span className="text-2xl font-bold text-amber-700">
                            {formatPrice(getTotalPrice())}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setShowCart(false);
                            router.push("/dashboard/checkout");
                          }}
                          className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Contact Button */}
          <button
            onClick={handleContactClick}
            className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Mail
              size={16}
              className="relative z-10 flex-shrink-0 text-white group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="relative z-10 hidden sm:inline text-sm font-semibold text-white">
              Contact
            </span>
          </button>

          {/* User Menu or Login */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 border-2 border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ring-2 ring-white group-hover:ring-amber-200 transition-all duration-300">
                    {(currentUser.displayName || currentUser.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="hidden lg:inline text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                  {currentUser.displayName || currentUser.email || "User"}
                </span>
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-slide-down overflow-hidden">
                    <div className="relative p-5 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 border-b border-amber-200">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200/30 to-transparent rounded-bl-full"></div>
                      <div className="relative flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white text-lg font-bold ring-4 ring-white shadow-lg">
                          {(currentUser.displayName || currentUser.email || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 truncate max-w-[150px]">
                            {currentUser.displayName || "User"}
                          </div>
                          <div className="text-xs text-gray-600 truncate mt-0.5 max-w-[150px]">
                            {currentUser.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-300 flex items-center gap-3 rounded-xl font-semibold group"
                      >
                        <LogOut
                          size={18}
                          className="group-hover:-translate-x-1 transition-transform duration-300"
                        />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleAuthClick("login")}
              className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 group-hover:from-amber-600 group-hover:to-yellow-700 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-white/20 to-transparent transition-transform duration-500"></div>
              <UserPlus
                size={16}
                className="relative z-10 flex-shrink-0 text-white group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="relative z-10 text-sm font-bold text-white">
                Login
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="relative w-full bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-t border-amber-200/50 py-3 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.1)_0%,transparent_70%)]"></div>
        <div className="overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap text-sm font-semibold">
            <span className="inline-flex items-center text-amber-800">
              <span className="inline-block animate-bounce mr-2">✨</span>
              Welcome to Shivam Jewellers - Where Tradition Meets Elegance
            </span>
            <span className="mx-6 text-amber-600 text-2xl">•</span>
            <span className="inline-flex items-center text-amber-800">
              <span className="inline-block mr-2">📞</span>
              Contact us at{" "}
              <span className="font-bold ml-1.5 text-amber-900">
                +91 6386487417
              </span>
            </span>
            <span className="mx-6 text-amber-600 text-2xl">•</span>
            <span className="inline-flex items-center text-amber-800">
              <span className="inline-block mr-2">📧</span>
              Email:{" "}
              <span className="font-bold ml-1.5 text-amber-900">
                contact@shivamjewellers.com
              </span>
            </span>
            <span className="mx-6 text-amber-600 text-2xl">•</span>
            <span className="inline-flex items-center text-amber-800">
              <span className="inline-block animate-pulse mr-2">💎</span>
              Explore our exclusive collection of gold, diamond & silver
              jewellery
            </span>
            <span className="mx-6 text-amber-600 text-2xl">•</span>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
        redirectTo={redirectTo}
      />
    </header>
  );
}
