"use client";
import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Building,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Filter,
  Search,
  RefreshCw,
  Download,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/lib/use-auth";
import Link from "next/link";

/**
 * ADMIN PAGE: Contact Form Submissions
 *
 * This page displays all contact form submissions.
 *
 * TO USE THIS PAGE:
 * 1. Uncomment Firestore code in src/app/api/contact/route.js
 * 2. Make sure firestore-helpers.js is properly set up
 * 3. Navigate to /admin/contact-submissions
 * 4. Add authentication check to restrict access to admins only
 */

export default function ContactSubmissions() {
  const { currentUser } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Mock data for demonstration (replace with actual Firestore data)
  const mockSubmissions = [
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      company: "ABC Enterprises",
      subject: "Question about GeM Registration",
      message:
        "I need help registering my company on GeM portal. Can you guide me through the process?",
      userId: "user123",
      userAuthenticated: true,
      timestamp: new Date("2025-10-05T10:30:00").toISOString(),
      status: "new",
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@company.com",
      phone: "+91 87654 32109",
      company: "Tech Solutions",
      subject: "Bid Assistance Required",
      message:
        "We are bidding for a government tender. Need guidance on the bidding process.",
      userId: "user456",
      userAuthenticated: true,
      timestamp: new Date("2025-10-04T14:15:00").toISOString(),
      status: "read",
    },
    {
      id: "3",
      name: "Amit Verma",
      email: "amit.v@mail.com",
      phone: "",
      company: "",
      subject: "Payment Issue",
      message:
        "Payment for order #12345 has been pending for 15 days. Please help.",
      userId: "guest",
      userAuthenticated: false,
      timestamp: new Date("2025-10-03T09:00:00").toISOString(),
      status: "replied",
    },
  ];

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchQuery, statusFilter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual Firestore query
      // import { getContactSubmissions } from '@/lib/firestore-helpers';
      // const data = await getContactSubmissions({ limit: 100 });

      // For now, using mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmissions(mockSubmissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = submissions;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((sub) => sub.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (sub) =>
          sub.name.toLowerCase().includes(query) ||
          sub.email.toLowerCase().includes(query) ||
          sub.subject.toLowerCase().includes(query) ||
          sub.message.toLowerCase().includes(query) ||
          (sub.company && sub.company.toLowerCase().includes(query))
      );
    }

    setFilteredSubmissions(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "read":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "replied":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Mail className="w-4 h-4" />;
      case "read":
        return <Eye className="w-4 h-4" />;
      case "replied":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportToCSV = () => {
    const csv = [
      [
        "Name",
        "Email",
        "Phone",
        "Company",
        "Subject",
        "Message",
        "Status",
        "Date",
      ],
      ...filteredSubmissions.map((sub) => [
        sub.name,
        sub.email,
        sub.phone || "",
        sub.company || "",
        sub.subject,
        sub.message,
        sub.status,
        formatDate(sub.timestamp),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading submissions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Contact Submissions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and respond to contact form inquiries
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchSubmissions}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Total
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {submissions.length}
                </p>
              </div>
              <MessageSquare className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  New
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {submissions.filter((s) => s.status === "new").length}
                </p>
              </div>
              <Mail className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Replied
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {submissions.filter((s) => s.status === "replied").length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Closed
                </p>
                <p className="text-2xl font-bold text-gray-600">
                  {submissions.filter((s) => s.status === "closed").length}
                </p>
              </div>
              <XCircle className="w-10 h-10 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        {filteredSubmissions.length > 0 ? (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {submission.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(
                            submission.status
                          )}`}
                        >
                          {getStatusIcon(submission.status)}
                          {submission.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {submission.email}
                        </span>
                        {submission.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {submission.phone}
                          </span>
                        )}
                        {submission.company && (
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {submission.company}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDate(submission.timestamp)}
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                          {submission.subject}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                          {submission.message}
                        </p>
                      </div>
                      {submission.userAuthenticated && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Authenticated User
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No submissions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Detail Modal (optional - you can expand this) */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Name
                </label>
                <p className="text-lg">{selectedSubmission.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-lg">{selectedSubmission.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Subject
                </label>
                <p className="text-lg">{selectedSubmission.subject}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Message
                </label>
                <p className="text-lg">{selectedSubmission.message}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSubmission(null)}
              className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
