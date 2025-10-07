"use client";
import {
  Sparkles,
  Crown,
  Diamond,
  Heart,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import Carousel from "../../../components/carousel";
import DashboardCards from "../../../components/dashboard-cards";
import { useSearchStore } from "../../../store/search-store";

export default function DashboardPage() {
  // Get search state from Zustand store
  const { searchQuery, clearSearch } = useSearchStore();
  // Carousel images for jewellery
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop",
      alt: "Luxury Gold Jewellery Collection",
    },
    {
      src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=600&fit=crop",
      alt: "Diamond Rings Collection",
    },
    {
      src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=600&fit=crop",
      alt: "Bridal Jewellery",
    },
    {
      src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=600&fit=crop",
      alt: "Traditional Indian Jewellery",
    },
  ];

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Carousel */}
      <div className="px-4 md:px-6 lg:px-8">
        <Carousel images={carouselImages} autoPlay={true} interval={4000} />
      </div>

      {/* Featured Collections Section */}
      <div className="px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-full border border-amber-200">
            <Sparkles className="w-5 h-5 text-amber-600 animate-pulse" />
            <span className="text-sm font-semibold text-amber-800 uppercase tracking-wider">
              Featured Collections
            </span>
            <Sparkles className="w-5 h-5 text-amber-600 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent mb-4 tracking-tight">
            Exquisite Jewellery Collection
          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of finest gold, diamond, and
            traditional jewellery pieces. Each item crafted with precision and
            passion to make your special moments unforgettable.
          </p>

          {/* Decorative elements */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          {[
            { icon: Crown, label: "Premium Quality", value: "100%" },
            { icon: Diamond, label: "Pure Gold", value: "22K-24K" },
            { icon: Heart, label: "Happy Customers", value: "10,000+" },
            { icon: Star, label: "Certified", value: "BIS" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-amber-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Jewellery Cards */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200 flex items-center justify-between animate-fade-in">
            <p className="text-gray-700">
              Showing results for:{" "}
              <span className="font-bold text-amber-700">"{searchQuery}"</span>
            </p>
            <button
              onClick={clearSearch}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100 border border-amber-300 hover:border-amber-400 rounded-lg transition-all duration-300 text-sm font-semibold text-amber-700 hover:text-amber-800 hover:scale-105"
            >
              <X className="w-4 h-4" />
              Clear Search
            </button>
          </div>
        )}
        <DashboardCards searchQuery={searchQuery} />
      </div>

      {/* Why Choose Us Section */}
      <div className="px-4 md:px-6 lg:px-8 py-16 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 rounded-3xl mx-4 md:mx-6 lg:mx-8 border border-amber-100">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Why Choose Shivam Jewellers?
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Trusted Since 1990",
              description:
                "Over 33 years of excellence in jewellery craftsmanship",
              icon: "🏆",
            },
            {
              title: "BIS Hallmarked",
              description: "All our gold jewellery is certified and hallmarked",
              icon: "✓",
            },
            {
              title: "Custom Designs",
              description:
                "Bring your dream design to life with our expert craftsmen",
              icon: "💎",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
