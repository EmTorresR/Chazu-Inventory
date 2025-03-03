// client/src/components/TopNav.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import Profile01 from "./Profile01";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function TopNav({ darkMode, toggleDarkMode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const breadcrumbs = [
    { label: "Chazu Inventory", href: "#" },
    { label: "Dashboard", href: "#" },
  ];

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
        </button>

        <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="focus:outline-none"
          >
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
              size={28}
              className="cursor-pointer rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30]"
            />
          </button>
          <div
            className={`absolute right-0 mt-2 w-64 bg-white dark:bg-[#0F0F12] border border-gray-200 dark:border-[#1F1F23] rounded-md shadow-lg transition-all duration-300 transform ${
              dropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            } z-50`}
          >
            <Profile01 />
          </div>
        </div>
      </div>
    </nav>
  );
}
