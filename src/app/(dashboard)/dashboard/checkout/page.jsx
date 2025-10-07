"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  CreditCard,
  Package,
  CheckCircle,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Wallet,
  Building,
  Phone,
  User,
  Home,
} from "lucide-react";
import AddressForm from "../../../../components/checkout/address-form";
import CartSummary from "../../../../components/checkout/cart-summary";
import BillingCalculation from "../../../../components/checkout/billing-calculation";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const product = JSON.parse(
      localStorage.getItem("selectedProduct") || "null"
    );

    setCartItems(cart);
    setSelectedProduct(product);

    // Load saved addresses (static for now)
    const savedAddresses = JSON.parse(
      localStorage.getItem("addresses") || "[]"
    );
    if (savedAddresses.length === 0) {
      // Add default addresses for demo
      const defaultAddresses = [
        {
          id: 1,
          name: "Home",
          fullName: "Rajesh Kumar",
          phone: "+91 9876543210",
          address: "123 MG Road, Connaught Place",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110001",
          isDefault: true,
        },
      ];
      setAddresses(defaultAddresses);
      setSelectedAddress(defaultAddresses[0]);
    } else {
      setAddresses(savedAddresses);
      setSelectedAddress(
        savedAddresses.find((a) => a.isDefault) || savedAddresses[0]
      );
    }
  }, []);

  const handleAddAddress = (newAddress) => {
    const addressWithId = {
      ...newAddress,
      id: Date.now(),
      isDefault: addresses.length === 0,
    };
    const updatedAddresses = [...addresses, addressWithId];
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setShowAddressForm(false);
    setSelectedAddress(addressWithId);
  };

  const handleEditAddress = (updatedAddress) => {
    const updatedAddresses = addresses.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : addr
    );
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    if (selectedAddress?.id === id) {
      setSelectedAddress(updatedAddresses[0] || null);
    }
  };

  const getTotalAmount = () => {
    if (selectedProduct) {
      return selectedProduct.price;
    }
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    // Here you would normally send order to backend
    setStep(3);

    // Clear cart after order
    setTimeout(() => {
      localStorage.removeItem("cart");
      localStorage.removeItem("selectedProduct");
      // Dispatch event to update cart in header
      window.dispatchEvent(new Event("cartUpdated"));
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[
        { num: 1, label: "Address", icon: MapPin },
        { num: 2, label: "Payment", icon: CreditCard },
        { num: 3, label: "Confirm", icon: CheckCircle },
      ].map((item, index) => (
        <div key={item.num} className="flex items-center">
          <div
            className={`flex flex-col items-center transition-all duration-300 ${
              step >= item.num ? "opacity-100" : "opacity-40"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                step >= item.num
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg scale-110"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold mt-2">{item.label}</span>
          </div>
          {index < 2 && (
            <div
              className={`h-0.5 w-16 sm:w-24 mx-2 transition-all duration-300 ${
                step > item.num ? "bg-amber-500" : "bg-gray-200"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order will be delivered soon.
          </p>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 mb-6">
            <div className="text-sm text-gray-600 mb-2">Order Total</div>
            <div className="text-3xl font-bold text-amber-700">
              ₹{getTotalAmount().toLocaleString("en-IN")}
            </div>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-6 transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Shopping</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent mb-2">
          Checkout
        </h1>
        <p className="text-gray-600">
          Complete your purchase in few simple steps
        </p>
      </div>

      {renderStepIndicator()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-amber-600" />
                  Delivery Address
                </h2>
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    setShowAddressForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              </div>

              {showAddressForm ? (
                <AddressForm
                  address={editingAddress}
                  onSave={editingAddress ? handleEditAddress : handleAddAddress}
                  onCancel={() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
                  }}
                />
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(address)}
                      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedAddress?.id === address.id
                          ? "border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg"
                          : "border-gray-200 hover:border-amber-300 hover:shadow-md"
                      }`}
                    >
                      {address.isDefault && (
                        <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Default
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-xl ${
                            selectedAddress?.id === address.id
                              ? "bg-amber-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Home className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {address.name}
                          </h3>
                          <p className="text-gray-700 font-semibold mb-1">
                            {address.fullName}
                          </p>
                          <p className="text-gray-600 text-sm mb-1">
                            {address.address}
                          </p>
                          <p className="text-gray-600 text-sm mb-2">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-gray-600 text-sm flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {address.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingAddress(address);
                            setShowAddressForm(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-300"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!showAddressForm && (
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedAddress}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-amber-600" />
                Payment Method
              </h2>

              <div className="space-y-4 mb-6">
                {[
                  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                  { id: "upi", label: "UPI Payment", icon: Wallet },
                  { id: "netbanking", label: "Net Banking", icon: Building },
                  { id: "cod", label: "Cash on Delivery", icon: Package },
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentMethod === method.id
                        ? "border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-md"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          paymentMethod === method.id
                            ? "bg-amber-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <method.icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        {method.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <CartSummary
              items={
                selectedProduct
                  ? [{ ...selectedProduct, quantity: 1 }]
                  : cartItems
              }
            />
            <BillingCalculation
              items={
                selectedProduct
                  ? [{ ...selectedProduct, quantity: 1 }]
                  : cartItems
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
