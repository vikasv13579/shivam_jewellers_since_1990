"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Star,
  Award,
  Shield,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import jewelleryProducts, { searchProducts } from "../data/jewellery-products";

const DashboardCards = ({ searchQuery = "" }) => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [displayCount, setDisplayCount] = useState(20); // Show 20 products initially
  const [filteredProducts, setFilteredProducts] = useState(jewelleryProducts);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      const results = searchProducts(searchQuery);
      setFilteredProducts(results);
      setDisplayCount(20); // Reset display count when search changes
    } else {
      setFilteredProducts(jewelleryProducts);
    }
  }, [searchQuery]);

  // Using filtered products for display
  // Showing products based on displayCount for pagination
  const jewelleryData = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;
  const totalProducts = filteredProducts.length;

  const handleBuyNow = (product) => {
    // Store product in localStorage for checkout
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push("/dashboard/checkout");
  };

  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already exists
    const existingIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Dispatch custom event to update cart in header
    window.dispatchEvent(new Event("cartUpdated"));

    // Show success message (you can add a toast notification here)
    alert(`✨ ${product.title} added to cart!`);
  };

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 20, filteredProducts.length));
  };

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jewelleryData.map((product, index) => {
          const isHovered = hoveredCard === index;
          const isLiked = likedItems.includes(product.id);

          return (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden animate-fadeIn"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs">Featured</span>
                </div>
              )}

              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-2 right-2 z-20 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  {product.discount}% OFF
                </div>
              )}

              {/* Like Button */}
              <button
                onClick={() => toggleLike(product.id)}
                className="absolute top-12 right-2 z-20 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>

              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isHovered ? "scale-110 rotate-2" : "scale-100"
                  }`}
                />

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Content Section */}
              <div className="p-3">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-amber-700 transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                  {product.description}
                </p>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-2 mb-2 p-2 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-600" />
                    <div>
                      <div className="text-xs text-gray-500">Purity</div>
                      <div className="text-xs font-bold text-gray-900">
                        {product.purity}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-600" />
                    <div>
                      <div className="text-xs text-gray-500">Weight</div>
                      <div className="text-xs font-bold text-gray-900">
                        {product.weight}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guarantee Badge */}
                <div className="flex items-center gap-1 mb-2 p-1.5 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">
                    {product.guarantee} Guarantee
                  </span>
                </div>

                {/* Price Section */}
                <div className="mb-2">
                  <div className="flex items-end gap-1.5 mb-1">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-gray-400 line-through mb-0.5">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 group/btn relative flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-sm rounded-lg transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">Buy Now</span>
                    <ArrowRight className="relative z-10 w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="group/cart w-9 h-9 flex items-center justify-center bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 hover:border-amber-300 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <ShoppingCart className="w-4 h-4 text-amber-600 group-hover/cart:scale-110 transition-transform duration-300" />
                  </button>
                </div>

                {/* Stock Status */}
                {product.inStock ? (
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-green-600 font-semibold">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    In Stock
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-red-600 font-semibold">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Hover overlay effect */}
              <div className="absolute inset-0 border-2 border-amber-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* No Results Message */}
      {totalProducts === 0 && searchQuery && (
        <div className="text-center py-16">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-8 bg-gradient-to-br from-gray-50 to-amber-50/30 border-2 border-gray-200 rounded-2xl">
            <Sparkles className="w-16 h-16 text-gray-300" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No products found for "{searchQuery}"
              </h3>
              <p className="text-gray-600">
                Try searching with different keywords or browse all products
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex flex-col items-center gap-4 mt-12">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Showing{" "}
              <span className="font-bold text-amber-700">{displayCount}</span>{" "}
              of{" "}
              <span className="font-bold text-amber-700">{totalProducts}</span>{" "}
              products
              {searchQuery && (
                <span className="text-gray-500"> matching "{searchQuery}"</span>
              )}
            </p>
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-600 transition-all duration-500"
                style={{
                  width: `${(displayCount / totalProducts) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <button
            onClick={loadMore}
            className="group relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>Load More Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* All Products Loaded Message */}
      {!hasMore && totalProducts > 20 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
            <Sparkles className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-700">
              You've viewed all {totalProducts} products
              {searchQuery && ` matching "${searchQuery}"`}!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCards;
