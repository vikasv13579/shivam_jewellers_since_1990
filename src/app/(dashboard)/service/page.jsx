"use client";
import React, { useState } from "react";
import {
  Briefcase,
  UserPlus,
  FileText,
  TrendingUp,
  ShieldCheck,
  Headphones,
  Award,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Users,
  Target,
  Zap,
  BookOpen,
  PackageSearch,
  CreditCard,
  BarChart3,
  HelpCircle,
  Rocket,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "GeM Registration Assistance",
    description:
      "Complete support for registering as a seller or buyer on Government e-Marketplace portal",
    icon: UserPlus,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Account setup and verification",
      "Document preparation and submission",
      "Digital Signature Certificate (DSC) guidance",
      "Profile optimization",
      "Compliance check",
    ],
    price: "Starting from ₹5,000",
    duration: "3-5 days",
    popular: true,
  },
  {
    id: 2,
    title: "Product Catalog Management",
    description:
      "Professional product listing and catalog management to maximize visibility and sales",
    icon: PackageSearch,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Product photography and optimization",
      "Detailed specifications and descriptions",
      "Category selection and mapping",
      "Competitive pricing strategy",
      "Regular catalog updates",
    ],
    price: "Starting from ₹3,000",
    duration: "2-3 days",
    popular: false,
  },
  {
    id: 3,
    title: "Bid Management Services",
    description:
      "Expert assistance in bidding process to increase your chances of winning government contracts",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
    features: [
      "Bid opportunity identification",
      "Competitive analysis and pricing",
      "Bid preparation and submission",
      "L1 strategy consultation",
      "Post-bid follow-up",
    ],
    price: "Starting from ₹8,000",
    duration: "Ongoing",
    popular: true,
  },
  {
    id: 4,
    title: "Compliance & Documentation",
    description:
      "Ensure all your documents and processes meet GeM compliance requirements",
    icon: ShieldCheck,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Document verification and validation",
      "Compliance audit",
      "Legal documentation support",
      "GST and tax compliance",
      "Regular compliance updates",
    ],
    price: "Starting from ₹4,000",
    duration: "1-2 days",
    popular: false,
  },
  {
    id: 5,
    title: "Training & Consultation",
    description:
      "Comprehensive training sessions and expert consultation for your team",
    icon: BookOpen,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Portal navigation training",
      "Best practices and strategies",
      "One-on-one consultation",
      "Video tutorials and resources",
      "24/7 support access",
    ],
    price: "Starting from ₹6,000",
    duration: "Flexible",
    popular: false,
  },
  {
    id: 6,
    title: "Payment & Finance Support",
    description:
      "Assistance with payment processing, invoicing, and financial management on GeM",
    icon: CreditCard,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Invoice generation and submission",
      "Payment tracking and follow-up",
      "Dispute resolution",
      "Financial reporting",
      "Banking integration support",
    ],
    price: "Starting from ₹2,500",
    duration: "Ongoing",
    popular: false,
  },
];

const processSteps = [
  {
    step: 1,
    title: "Consultation",
    description: "Free initial consultation to understand your needs",
    icon: MessageSquare,
  },
  {
    step: 2,
    title: "Planning",
    description: "Customized strategy and timeline for your requirements",
    icon: Target,
  },
  {
    step: 3,
    title: "Execution",
    description: "Expert team handles all the work professionally",
    icon: Rocket,
  },
  {
    step: 4,
    title: "Support",
    description: "Ongoing support and guidance whenever you need",
    icon: Headphones,
  },
];

const whyChooseUs = [
  {
    icon: Award,
    title: "Expert Team",
    description: "Certified GeM experts with years of experience",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Quick and efficient service delivery",
  },
  {
    icon: ShieldCheck,
    title: "100% Compliance",
    description: "Ensure full compliance with government norms",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance for your queries",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Track record of successful registrations and bids",
  },
  {
    icon: Users,
    title: "500+ Clients",
    description: "Trusted by hundreds of businesses across India",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "ABC Enterprises",
    text: "GeM Service helped us register on the portal within 3 days. Their team handled everything professionally. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    company: "Tech Solutions Pvt Ltd",
    text: "Excellent bid management service. We won our first government contract within a month of working with them.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    company: "Green Industries",
    text: "Professional, responsive, and knowledgeable. They made the entire GeM process smooth and hassle-free.",
    rating: 5,
  },
];

export default function Service() {
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "registration", "management", "support"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-xl">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Comprehensive GeM solutions to help your business succeed in
            government procurement. From registration to bid management, we've
            got you covered.
          </p>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                500+
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Happy Clients
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                98%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Success Rate
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                3-5 Days
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Avg. Turnaround
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                4.9/5
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Client Rating
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Service Offerings
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative ${
                  service.popular ? "ring-2 ring-indigo-500" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                    POPULAR
                  </div>
                )}

                <div
                  className={`h-48 bg-gradient-to-br ${service.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                  <service.icon className="w-20 h-20 text-white relative z-10" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Starting from
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {service.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Duration
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {service.duration}
                      </p>
                    </div>
                  </div>

                  <button className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Our simple 4-step process ensures smooth and efficient service
            delivery
          </p>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 -mt-8 relative z-10 shadow-lg">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-indigo-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            What Our Clients Say
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Trusted by hundreds of businesses across India
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Zap className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-indigo-100 text-lg mb-8">
                Let our experts help you succeed on Government e-Marketplace.
                Book a free consultation today!
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Phone className="w-10 h-10 mx-auto mb-3" />
                  <p className="font-semibold mb-2">Call Us</p>
                  <p className="text-sm text-indigo-100">+91 6386487417</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Mail className="w-10 h-10 mx-auto mb-3" />
                  <p className="font-semibold mb-2">Email Us</p>
                  <p className="text-sm text-indigo-100">
                    services@gemservice.com
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3" />
                  <p className="font-semibold mb-2">Live Chat</p>
                  <p className="text-sm text-indigo-100">Available 24/7</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
                >
                  Contact Us Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/register-help"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <HelpCircle className="w-5 h-5" />
                  View Help Guide
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Quick answers to common questions about our services
          </p>

          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  What services do you offer?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm pl-7">
                  We offer complete GeM solutions including registration, bid
                  management, catalog management, compliance support, training,
                  and payment assistance.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  How long does registration take?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm pl-7">
                  Typically 3-5 business days from document submission to
                  approval, depending on verification process.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  Do you provide ongoing support?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm pl-7">
                  Yes! We offer 24/7 support, regular updates, and ongoing
                  consultation to ensure your success on GeM.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  What is your success rate?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm pl-7">
                  We have a 98% success rate for registrations and our clients
                  have won numerous government contracts through our bid
                  management services.
                </p>
              </div>
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
