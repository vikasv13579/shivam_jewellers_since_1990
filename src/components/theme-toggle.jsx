"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg">
        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        <span className="text-xs lg:text-sm font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap">
          Theme
        </span>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-700 dark:hover:to-gray-600 border border-gray-200 dark:border-gray-600 transition-all duration-300 cursor-pointer hover:shadow-lg group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <>
          <Sun
            size={16}
            className="text-yellow-500 flex-shrink-0 group-hover:rotate-90 transition-transform duration-500"
          />
          <span className="text-xs lg:text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-200">
            Light
          </span>
        </>
      ) : (
        <>
          <Moon
            size={16}
            className="text-blue-600 flex-shrink-0 group-hover:-rotate-12 transition-transform duration-500"
          />
          <span className="text-xs lg:text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-200">
            Dark
          </span>
        </>
      )}
    </button>
  );
}
