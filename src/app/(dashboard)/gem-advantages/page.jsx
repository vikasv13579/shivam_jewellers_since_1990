"use client";
import React, { useState } from "react";
import {
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Globe,
  Users,
  CheckCircle,
  XCircle,
  Award,
  Target,
  Zap,
  FileText,
  BarChart3,
  ShoppingCart,
  Lightbulb,
  Lock,
  RefreshCw,
  Truck,
  CreditCard,
  Search,
  Star,
  Building2,
  ChevronRight,
  ArrowRight,
  ThumbsUp,
  TrendingDown,
  AlertCircle,
  Package,
} from "lucide-react";
import Link from "next/link";
const ShieldCheck = Shield;
const keyAdvantages = [
  {
    icon: Shield,
    title: "Transparency & Trust",
    description:
      "Complete transparency in pricing, bidding, and procurement process with end-to-end digital trail",
    gradient: "from-blue-500 to-cyan-500",
    stats: "100% Transparent",
  },
  {
    icon: Clock,
    title: "Time Efficiency",
    description:
      "Drastically reduced procurement cycle time from months to days with automated processes",
    gradient: "from-purple-500 to-pink-500",
    stats: "70% Faster",
  },
  {
    icon: DollarSign,
    title: "Cost Savings",
    description:
      "Competitive pricing through L1 bidding system results in significant cost reduction for buyers",
    gradient: "from-green-500 to-teal-500",
    stats: "15-25% Savings",
  },
  {
    icon: Globe,
    title: "Wide Market Access",
    description:
      "Connect with government buyers and sellers across India on a single unified platform",
    gradient: "from-orange-500 to-red-500",
    stats: "Pan-India Reach",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description:
      "Government-backed secure payment gateway ensures timely payments and financial security",
    gradient: "from-indigo-500 to-purple-500",
    stats: "100% Secure",
  },
  {
    icon: FileText,
    title: "Paperless Process",
    description:
      "Completely digital documentation and processes eliminate paperwork and physical storage",
    gradient: "from-yellow-500 to-orange-500",
    stats: "Zero Paperwork",
  },
];

const sellerBenefits = [
  {
    title: "Direct Government Access",
    description: "Sell directly to 50,000+ government buyers nationwide",
    icon: Building2,
  },
  {
    title: "No Commission Fees",
    description: "Zero platform commission or listing fees for sellers",
    icon: DollarSign,
  },
  {
    title: "MSME Priority",
    description: "Special provisions and preferences for MSME sellers",
    icon: Award,
  },
  {
    title: "Guaranteed Payments",
    description: "Timely payments backed by government departments",
    icon: CreditCard,
  },
  {
    title: "Pan-India Presence",
    description: "Expand your business reach across all states",
    icon: Globe,
  },
  {
    title: "Quality Recognition",
    description: "Build reputation through ratings and successful orders",
    icon: Star,
  },
];

const buyerBenefits = [
  {
    title: "Best Market Prices",
    description: "Competitive pricing through L1 bidding mechanism",
    icon: TrendingDown,
  },
  {
    title: "Quality Assurance",
    description: "Verified sellers with ratings and performance history",
    icon: ShieldCheck,
  },
  {
    title: "Compliance Made Easy",
    description: "Built-in compliance with government procurement rules",
    icon: CheckCircle,
  },
  {
    title: "Wide Product Range",
    description: "Lakhs of products and services in one marketplace",
    icon: Package,
  },
  {
    title: "Quick Procurement",
    description: "Place orders in minutes, not months",
    icon: Zap,
  },
  {
    title: "Audit Trail",
    description: "Complete digital documentation for audits",
    icon: FileText,
  },
];

const traditionalVsGem = {
  traditional: [
    { feature: "Registration", value: "Complex, 30-45 days", negative: true },
    { feature: "Process Time", value: "3-6 months", negative: true },
    { feature: "Cost", value: "High overhead costs", negative: true },
    { feature: "Transparency", value: "Limited visibility", negative: true },
    { feature: "Documentation", value: "Heavy paperwork", negative: true },
    {
      feature: "Market Access",
      value: "Limited to known vendors",
      negative: true,
    },
    { feature: "Payment", value: "Delayed, uncertain", negative: true },
    { feature: "Monitoring", value: "Manual tracking", negative: true },
  ],
  gem: [
    { feature: "Registration", value: "Simple, 3-5 days", positive: true },
    { feature: "Process Time", value: "Few days to weeks", positive: true },
    { feature: "Cost", value: "15-25% savings", positive: true },
    { feature: "Transparency", value: "100% transparent", positive: true },
    { feature: "Documentation", value: "100% paperless", positive: true },
    {
      feature: "Market Access",
      value: "50,000+ buyers/sellers",
      positive: true,
    },
    { feature: "Payment", value: "Timely, guaranteed", positive: true },
    { feature: "Monitoring", value: "Real-time dashboard", positive: true },
  ],
};

const statistics = [
  { label: "Total Transactions", value: "₹4+ Lakh Crore", icon: BarChart3 },
  { label: "Registered Sellers", value: "60+ Lakhs", icon: Users },
  { label: "Government Buyers", value: "50,000+", icon: Building2 },
  { label: "Product Categories", value: "10,000+", icon: Package },
  { label: "Daily Orders", value: "50,000+", icon: ShoppingCart },
  { label: "Average Savings", value: "15-25%", icon: TrendingDown },
];

const successStories = [
  {
    type: "MSME Success",
    company: "Small Manufacturing Unit",
    achievement: "Grew 300% in 2 years",
    description:
      "From local supplier to pan-India government vendor through GeM",
    icon: TrendingUp,
    color: "green",
  },
  {
    type: "Cost Savings",
    company: "Government Department",
    achievement: "Saved ₹2.5 Crores",
    description: "Annual procurement cost reduced by 22% using GeM platform",
    icon: DollarSign,
    color: "blue",
  },
  {
    type: "Time Efficiency",
    company: "Public Sector Unit",
    achievement: "80% Faster Procurement",
    description: "Reduced procurement cycle from 90 days to 18 days on average",
    icon: Clock,
    color: "purple",
  },
];

export default function GemAdvantages() {
  const [activeTab, setActiveTab] = useState("seller");
  const [showComparison, setShowComparison] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-xl">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            GeM Advantages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Discover why Government e-Marketplace is revolutionizing public
            procurement in India. Transparent, efficient, and accessible for
            all.
          </p>

          {/* Hero Stats */}
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl px-8 py-4 shadow-lg">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-green-600" />
              <span className="font-bold text-gray-900 dark:text-white">
                India's #1
              </span>
            </div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Public Procurement Portal
            </span>
          </div>
        </div>

        {/* Key Advantages Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Why Choose GeM?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyAdvantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div
                  className={`h-32 bg-gradient-to-br ${advantage.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <advantage.icon className="w-16 h-16 text-white relative z-10" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold">
                    {advantage.stats}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              GeM in Numbers
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className="w-10 h-10 text-white mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-indigo-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Toggle Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Benefits by User Type
          </h2>

          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("seller")}
              className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "seller"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              For Sellers
            </button>
            <button
              onClick={() => setActiveTab("buyer")}
              className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "buyer"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              <Building2 className="w-5 h-5" />
              For Buyers
            </button>
          </div>

          {/* Benefits Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {(activeTab === "seller" ? sellerBenefits : buyerBenefits).map(
              (benefit, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-indigo-500"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Traditional vs GeM Comparison */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Traditional Procurement vs GeM
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              See how GeM transforms the procurement process
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
              {/* Traditional Column */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Traditional Method
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Old procurement system
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {traditionalVsGem.traditional.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg"
                    >
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {item.feature}
                        </p>
                        <p className="text-xs text-red-700 dark:text-red-400">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GeM Column */}
              <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      GeM Platform
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Modern digital solution
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {traditionalVsGem.gem.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {item.feature}
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-400">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Real Success Stories
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            See how businesses and government departments are benefiting
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 bg-${story.color}-100 dark:bg-${story.color}-900/30 rounded-xl flex items-center justify-center mb-4`}
                >
                  <story.icon
                    className={`w-7 h-7 text-${story.color}-600 dark:text-${story.color}-400`}
                  />
                </div>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full mb-3">
                  {story.type}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {story.company}
                </h3>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                  {story.achievement}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features Highlight */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Makes GeM Unique
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Government-Backed Platform
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Official procurement portal backed by Ministry of Commerce,
                    ensuring credibility and trust
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Continuous Innovation
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Regular updates with new features, categories, and
                    improvements based on user feedback
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Make in India Focus
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Promotes local manufacturers and supports India's
                    self-reliance initiative
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Inclusive Ecosystem
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Open to all - from small startups to large enterprises,
                    creating equal opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the Advantages?
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of businesses and government departments already
              benefiting from GeM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register-help"
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/service"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
              >
                View Our Services
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
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
