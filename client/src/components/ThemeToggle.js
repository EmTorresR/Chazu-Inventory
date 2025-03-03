// client/src/components/ThemeToggle.js
import React from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none"
    >
      {darkMode ? (
        <Sun className="h-6 w-6 text-yellow-500" />
      ) : (
        <Moon className="h-6 w-6 text-gray-600" />
      )}
    </button>
  );
}
