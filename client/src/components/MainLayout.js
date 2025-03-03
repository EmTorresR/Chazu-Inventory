// client/src/components/MainLayout.js
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : true; // Modo oscuro predeterminado
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Aquí actualizamos el elemento raíz (<html>) para que tenga la clase "dark"
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className={`min-h-screen`}>
      <div className="flex flex-col h-full">
        <div className="flex flex-1">
          <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <div className="flex-1 flex flex-col">
            <header className="h-16">
              <TopNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </header>
            <main
              className="flex-1 p-4 bg-white dark:bg-gradient-to-b dark:from-[#0F0F12] dark:to-[#1F1F23] transition-colors duration-500 overflow-y-auto"
              style={{ minHeight: "calc(100vh - 4rem)" }}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
