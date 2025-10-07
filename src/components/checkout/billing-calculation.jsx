"use client";
import { Receipt, Truck, Tag, CreditCard } from "lucide-react";

export default function BillingCalculation({ items }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const gstRate = 0.03; // 3% GST on gold
  const gst = subtotal * gstRate;
  const shippingFee = subtotal > 50000 ? 0 : 500; // Free shipping above ₹50,000
  const discount = items.reduce((total, item) => {
    const originalPrice = item.originalPrice || item.price;
    const savings = (originalPrice - item.price) * (item.quantity || 1);
    return total + savings;
  }, 0);

  const total = subtotal + gst + shippingFee;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl p-6 border-2 border-amber-200">
      <div className="flex items-center gap-2 mb-6">
        <Receipt className="w-6 h-6 text-amber-600" />
        <h3 className="text-xl font-bold text-gray-900">Bill Details</h3>
      </div>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700 flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            Item Total
          </span>
          <span className="font-semibold text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between items-center py-2">
            <span className="text-green-600 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Discount
            </span>
            <span className="font-semibold text-green-600">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        {/* GST */}
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700 flex items-center gap-2 text-sm">
            GST (3%)
          </span>
          <span className="font-semibold text-gray-900">
            {formatPrice(gst)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700 flex items-center gap-2">
            <Truck className="w-4 h-4 text-gray-500" />
            Delivery Charges
          </span>
          {shippingFee === 0 ? (
            <span className="font-semibold text-green-600 flex items-center gap-1">
              FREE
              <span className="text-xs line-through text-gray-400">₹500</span>
            </span>
          ) : (
            <span className="font-semibold text-gray-900">
              {formatPrice(shippingFee)}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t-2 border-amber-300 pt-4 mt-2"></div>

        {/* Total */}
        <div className="flex justify-between items-center bg-gradient-to-r from-amber-100 to-yellow-100 -mx-6 px-6 py-4 rounded-xl">
          <span className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-700" />
            Total Amount
          </span>
          <span className="text-2xl font-bold text-amber-700">
            {formatPrice(total)}
          </span>
        </div>

        {/* Savings Info */}
        {discount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Tag className="w-5 h-5" />
              <span className="font-semibold">
                You're saving {formatPrice(discount)} on this order!
              </span>
            </div>
          </div>
        )}

        {/* Free Shipping Info */}
        {shippingFee > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-2">
            <div className="text-center text-sm text-blue-700">
              <p className="font-semibold">
                Add {formatPrice(50000 - subtotal)} more for FREE delivery!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Security Badge */}
      <div className="mt-6 pt-6 border-t border-amber-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-xs font-bold">✓</span>
          </div>
          <span>100% Secure Payment</span>
        </div>
      </div>
    </div>
  );
}
