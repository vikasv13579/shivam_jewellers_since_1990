"use client";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function CartSummary({ items }) {
  const [quantities, setQuantities] = useState(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity || 1 }), {})
  );

  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-semibold">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-6 h-6 text-amber-600" />
        <h3 className="text-xl font-bold text-gray-900">
          Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
        </h3>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative bg-gradient-to-br from-amber-50/30 to-yellow-50/30 rounded-xl p-4 border border-amber-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  {item.purity} • {item.weight}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors duration-300"
                  >
                    <Minus className="w-3 h-3 text-amber-700" />
                  </button>
                  <span className="w-8 text-center font-semibold text-sm">
                    {quantities[item.id] || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors duration-300"
                  >
                    <Plus className="w-3 h-3 text-amber-700" />
                  </button>
                </div>

                {/* Price */}
                <div className="font-bold text-amber-700">
                  {formatPrice(item.price * (quantities[item.id] || 1))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
