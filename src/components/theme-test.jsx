"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeTest() {
  const { theme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="p-4 bg-card border border-border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Theme Debug Info</h3>
      <div className="space-y-1 text-sm">
        <p>
          <strong>Theme:</strong> {theme}
        </p>
        <p>
          <strong>Resolved Theme:</strong> {resolvedTheme}
        </p>
        <p>
          <strong>System Theme:</strong> {systemTheme}
        </p>
        <p>
          <strong>Mounted:</strong> {mounted ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
