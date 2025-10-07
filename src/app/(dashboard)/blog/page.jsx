"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  TrendingUp,
  ShoppingCart,
  FileText,
  Award,
  Users,
  Zap,
  ArrowRight,
  Filter,
} from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to GeM Registration for Sellers",
    excerpt:
      "Learn step-by-step how to register as a seller on Government e-Marketplace and start selling to government buyers across India.",
    content:
      "Government e-Marketplace (GeM) has revolutionized public procurement in India. This comprehensive guide walks you through the entire registration process...",
    author: "Rajesh Kumar",
    date: "October 1, 2025",
    readTime: "8 min read",
    category: "Registration",
    tags: ["Getting Started", "Seller Guide", "Registration"],
    image: "from-blue-500 to-cyan-500",
    featured: true,
  },
  {
    id: 2,
    title: "Top 10 Benefits of Using GeM Portal",
    excerpt:
      "Discover why thousands of businesses are choosing GeM for government procurement. From transparency to faster payments, explore all advantages.",
    content:
      "The Government e-Marketplace offers numerous benefits for both buyers and sellers. Transparency, efficiency, and ease of doing business...",
    author: "Priya Sharma",
    date: "September 28, 2025",
    readTime: "6 min read",
    category: "Benefits",
    tags: ["Benefits", "Business Growth", "Government"],
    image: "from-purple-500 to-pink-500",
    featured: true,
  },
  {
    id: 3,
    title: "How to Win GeM Bids: Expert Tips & Strategies",
    excerpt:
      "Master the art of competitive bidding on GeM. Learn pricing strategies, quality scoring, and best practices from successful sellers.",
    content:
      "Winning bids on GeM requires more than just competitive pricing. Understanding the L1 bidding system, quality parameters...",
    author: "Amit Verma",
    date: "September 25, 2025",
    readTime: "10 min read",
    category: "Tips & Tricks",
    tags: ["Bidding", "Strategy", "Winning"],
    image: "from-orange-500 to-red-500",
    featured: false,
  },
  {
    id: 4,
    title: "Understanding GeM Payment Process & Timelines",
    excerpt:
      "Everything you need to know about GeM payments - from invoice submission to payment realization, refunds, and common issues.",
    content:
      "One of the biggest advantages of GeM is the streamlined payment process. Government departments are mandated to make payments within...",
    author: "Sneha Patel",
    date: "September 22, 2025",
    readTime: "7 min read",
    category: "Payments",
    tags: ["Payments", "Finance", "Timeline"],
    image: "from-green-500 to-teal-500",
    featured: false,
  },
  {
    id: 5,
    title: "GeM Product Catalog: Best Practices for Listing",
    excerpt:
      "Create compelling product listings that attract buyers. Learn about images, descriptions, specifications, and pricing strategies.",
    content:
      "Your product catalog is your storefront on GeM. High-quality images, detailed specifications, competitive pricing...",
    author: "Vikram Singh",
    date: "September 20, 2025",
    readTime: "9 min read",
    category: "Product Listing",
    tags: ["Catalog", "Products", "Best Practices"],
    image: "from-indigo-500 to-purple-500",
    featured: false,
  },
  {
    id: 6,
    title: "MSME Benefits & Special Provisions on GeM",
    excerpt:
      "Explore exclusive benefits for MSMEs including preferential market access, relaxed bid security, and startup advantages.",
    content:
      "The Government of India has introduced several provisions to support MSMEs on GeM. These include reservation in procurement...",
    author: "Anita Desai",
    date: "September 18, 2025",
    readTime: "6 min read",
    category: "MSME",
    tags: ["MSME", "Benefits", "Startups"],
    image: "from-yellow-500 to-orange-500",
    featured: false,
  },
];

const categories = [
  "All",
  "Registration",
  "Benefits",
  "Tips & Tricks",
  "Payments",
  "Product Listing",
  "MSME",
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            GeM Insights Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expert guides, tips, and insights about Government e-Marketplace to
            help you succeed in public procurement
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 dark:text-white shadow-lg transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-105 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "All" && searchQuery === "" && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${post.image} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <FileText className="w-20 h-20 text-white opacity-90" />
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-4 py-2 rounded-full text-sm font-semibold text-gray-900 dark:text-white shadow-lg">
                      Featured
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {post.author}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <FileText className="w-8 h-8 text-purple-600" />
            {selectedCategory === "All" ? "All Articles" : selectedCategory}
            <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
              ({filteredPosts.length})
            </span>
          </h2>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${post.image} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <FileText className="w-16 h-16 text-white opacity-90" />
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with GeM Insights
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Subscribe to our newsletter for the latest guides, tips, and
              updates about Government e-Marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl outline-none text-gray-900 shadow-lg"
              />
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
