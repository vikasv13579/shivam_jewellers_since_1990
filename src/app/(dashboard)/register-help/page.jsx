"use client";
import React, { useState } from "react";
import {
  UserPlus,
  CheckCircle,
  FileText,
  Upload,
  ShieldCheck,
  CreditCard,
  Building2,
  Mail,
  Phone,
  Download,
  Play,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  AlertCircle,
  Users,
  Store,
  ArrowRight,
  BookOpen,
  Zap,
} from "lucide-react";
import Link from "next/link";

const registrationSteps = [
  {
    id: 1,
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up with your email and phone number",
    details: [
      "Visit GeM portal (gem.gov.in)",
      "Click on 'Sign Up' button",
      "Choose user type (Buyer/Seller)",
      "Enter mobile number and email",
      "Verify OTP sent to mobile and email",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    icon: FileText,
    title: "Business Details",
    description: "Fill in your company information",
    details: [
      "Enter PAN card details",
      "Provide company/business name",
      "Fill registered address",
      "Select business category",
      "Enter GST number (if applicable)",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    icon: Upload,
    title: "Upload Documents",
    description: "Submit required verification documents",
    details: [
      "PAN Card copy",
      "GST Registration Certificate",
      "Company Registration Certificate",
      "Bank Account details",
      "Digital Signature Certificate (DSC)",
    ],
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Verification",
    description: "Wait for document verification",
    details: [
      "GeM team reviews your documents",
      "Verification takes 2-3 business days",
      "You'll receive email updates",
      "Fix any issues if documents rejected",
      "Approval notification via email/SMS",
    ],
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: 5,
    icon: CreditCard,
    title: "Payment & Activation",
    description: "Complete payment and activate account",
    details: [
      "Pay registration fees (if applicable)",
      "Set up payment methods",
      "Complete profile (100%)",
      "Account gets activated",
      "Start using GeM portal",
    ],
    gradient: "from-indigo-500 to-purple-500",
  },
];

const userTypes = [
  {
    type: "Seller",
    icon: Store,
    color: "indigo",
    description:
      "Register as a seller to supply goods and services to government",
    requirements: [
      "Valid PAN Card",
      "GST Registration",
      "Bank Account",
      "Digital Signature (Class 3)",
      "Product/Service Catalog",
    ],
  },
  {
    type: "Buyer",
    icon: Users,
    color: "emerald",
    description:
      "Register as a buyer to procure goods and services for your organization",
    requirements: [
      "Government Email ID",
      "Department Authorization",
      "Official Orders",
      "Digital Signature (Class 3)",
      "Budget Allocation Details",
    ],
  },
];

const faqs = [
  {
    question: "How long does GeM registration take?",
    answer:
      "The registration process typically takes 3-5 business days. Account creation is instant, but document verification by the GeM team takes 2-3 days. Once approved, you can start using the portal immediately.",
  },
  {
    question: "What documents are required for seller registration?",
    answer:
      "You need: PAN Card, GST Registration Certificate, Bank Account details with cancelled cheque, Company Registration Certificate, and Class 3 Digital Signature Certificate (DSC). MSMEs may have some relaxations.",
  },
  {
    question: "Is there any registration fee?",
    answer:
      "For most sellers, GeM registration is FREE. However, you may need to pay for Digital Signature Certificate (DSC) from authorized agencies. No hidden charges or commission on sales.",
  },
  {
    question: "Can I register without GST?",
    answer:
      "GST registration is mandatory for most sellers. However, exemptions exist for certain categories like farmers, artisans, and businesses below GST threshold. Check specific category requirements.",
  },
  {
    question: "What is Digital Signature Certificate (DSC)?",
    answer:
      "DSC is a secure digital key to sign documents electronically. Class 3 DSC is required for GeM registration. You can obtain it from licensed Certifying Authorities (CAs) like eMudhra, Sify, nCode, etc.",
  },
  {
    question: "How do I update my registration details?",
    answer:
      "Login to your GeM account, go to Profile/Settings section, and update required information. Some changes may require document re-verification. Contact support for major changes.",
  },
];

const resources = [
  {
    title: "GeM Registration Manual",
    type: "PDF Guide",
    size: "2.5 MB",
    icon: FileText,
    color: "blue",
  },
  {
    title: "Document Checklist",
    type: "PDF",
    size: "500 KB",
    icon: CheckCircle,
    color: "green",
  },
  {
    title: "Video Tutorial - Seller Registration",
    type: "Video",
    size: "45 min",
    icon: Play,
    color: "red",
  },
  {
    title: "Common Mistakes to Avoid",
    type: "PDF Guide",
    size: "1.2 MB",
    icon: AlertCircle,
    color: "orange",
  },
];

export default function RegisterHelp() {
  const [activeStep, setActiveStep] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState("Seller");

  const toggleStep = (stepId) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            GeM Registration Help
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Complete step-by-step guide to register on Government e-Marketplace.
            Start your journey to government procurement today!
          </p>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                3-5 Days
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Average Registration Time
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                5 Steps
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Simple Process
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                FREE
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No Registration Fee
              </p>
            </div>
          </div>
        </div>

        {/* User Type Selection */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Choose Your Registration Type
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {userTypes.map((user) => (
              <div
                key={user.type}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  selectedUserType === user.type
                    ? `border-${user.color}-500`
                    : "border-transparent"
                }`}
                onClick={() => setSelectedUserType(user.type)}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br from-${user.color}-500 to-${user.color}-600 rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <user.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {user.type} Registration
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {user.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Requirements:
                  </p>
                  {user.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {req}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Registration Process
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {registrationSteps.map((step, index) => (
              <div
                key={step.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full p-6 flex items-center gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        STEP {step.id}
                      </span>
                      <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {index === registrationSteps.length - 1
                          ? "Final Step"
                          : `Next: Step ${step.id + 1}`}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                  {activeStep === step.id ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>

                {activeStep === step.id && (
                  <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="pt-6 space-y-3">
                      <p className="font-semibold text-gray-900 dark:text-white mb-3">
                        Detailed Steps:
                      </p>
                      {step.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">
                              {idx + 1}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Documents */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <AlertCircle className="w-12 h-12 text-white flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Important Documents Checklist
                  </h2>
                  <p className="text-orange-100 text-lg">
                    Keep these documents ready before starting registration
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "PAN Card (Scanned copy)",
                  "GST Registration Certificate",
                  "Company Registration Certificate",
                  "Bank Account Details + Cancelled Cheque",
                  "Digital Signature Certificate (Class 3)",
                  "Address Proof (Latest utility bill)",
                  "Authorized Signatory Details",
                  "Product/Service Catalog (for sellers)",
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Got questions? We've got answers!
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  {activeFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {activeFaq === index && (
                  <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                    <p className="pt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Download Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Download Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div
                  className={`w-14 h-14 bg-${resource.color}-100 dark:bg-${resource.color}-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <resource.icon
                    className={`w-7 h-7 text-${resource.color}-600 dark:text-${resource.color}-400`}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {resource.title}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {resource.type}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {resource.size}
                  </span>
                </div>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Need More Help Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Still Need Help?
              </h2>
              <p className="text-indigo-100 text-lg mb-8">
                Our expert team is here to assist you with the registration
                process
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Phone className="w-10 h-10 mx-auto mb-3" />
                  <p className="font-semibold mb-2">Call Us</p>
                  <p className="text-sm text-indigo-100">+91 6386487417</p>
                  <p className="text-xs text-indigo-200 mt-1">
                    Mon-Fri, 9 AM - 6 PM
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Mail className="w-10 h-10 mx-auto mb-3" />
                  <p className="font-semibold mb-2">Email Us</p>
                  <p className="text-sm text-indigo-100">
                    zemtechexperts@gmail.com
                  </p>
                  <p className="text-xs text-indigo-200 mt-1">
                    24-48 hour response
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Building2 className="w-10 h-10 mx-auto mb-3" />
                  <p className="font-semibold mb-2">Visit Office</p>
                  <p className="text-sm text-indigo-100">New Delhi, India</p>
                  <p className="text-xs text-indigo-200 mt-1">
                    Book appointment first
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
                >
                  Contact Support
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="https://gem.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Visit GeM Portal
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
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
