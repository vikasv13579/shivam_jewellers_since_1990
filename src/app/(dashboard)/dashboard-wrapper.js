"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header/header";
import Footer from "@/components/dashboard/footer/footer";

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50/30 to-yellow-50/30 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Loading content */}
      <div className="text-center relative z-10">
        <div className="relative inline-block">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-amber-200 animate-spin" style={{ animationDuration: '2s' }}></div>
          {/* Inner spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-amber-500 border-r-yellow-500"></div>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-gray-700 font-semibold animate-pulse">Loading Shivam Jewellers...</p>
        <div className="flex gap-1 justify-center mt-3">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-amber-50/30 to-yellow-50/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-100/5 to-transparent rounded-full"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 shadow-lg">
        <Header />
      </header>
      
      <main className="flex-1 pt-28 md:pt-32 pb-12 min-h-screen relative">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      
      <footer className="w-full relative z-10">
        <Footer />
      </footer>
    </div>
  );
}
