"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu,
  X,
  Home,
  Settings,
  BarChart3,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/lib/use-auth";

export default function Navbar({ onAuthClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();

  const links = [
    { name: "Gem Advantage", href: "/gem-advantages", icon: Home },
    { name: "Service", href: "/service", icon: Settings },
    { name: "Blog", href: "/blog", icon: BarChart3 },
    { name: "Contact", href: "/contact", icon: User },
    { name: "Register Help", href: "/register-help", icon: User },
  ];

  const handleLinkClick = (href) => {
    if (!currentUser) {
      onAuthClick("login", href);
      return;
    }
    router.push(href);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsMenuOpen((v) => !v)}
        className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className="hidden md:flex items-center gap-1 lg:gap-2">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => handleLinkClick(link.href)}
            className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 border border-transparent hover:border-blue-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-md transform hover:scale-105"
          >
            <link.icon size={16} className="flex-shrink-0" />
            <span className="text-xs lg:text-sm font-medium whitespace-nowrap">
              {link.name}
            </span>
          </button>
        ))}
        <div className="ml-2 lg:ml-3 pl-2 lg:pl-3 border-l border-gray-300 dark:border-gray-600">
          <ThemeToggle />
        </div>
      </nav>
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 mt-3 mx-3 sm:mx-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-2xl z-50 animate-slide-down">
          <div className="space-y-2">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  handleLinkClick(link.href);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 border border-transparent hover:border-blue-200 dark:hover:border-gray-600 transition-all duration-300 w-full text-left hover:shadow-md"
              >
                <link.icon size={18} className="flex-shrink-0" />
                <span className="text-sm font-medium">{link.name}</span>
              </button>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
