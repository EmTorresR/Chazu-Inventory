import React, { useState } from "react";
import {
  Home,
  BarChart2,
  Users2,
  Package,
  Edit2,
  History,
  Calendar,
  List,
  Settings,
  HelpCircle,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ darkMode, toggleDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  function NavItem({ href, icon: Icon, children }) {
    return (
      <Link
        to={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    );
  }

  return (
    <>
      {/* Botón para abrir el sidebar en móvil */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo / Header */}
          <div className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            <Link
              to="/"
              onClick={handleNavigation}
              className="flex items-center gap-3"
            >
              <img
                src="/images/Avatar.png" /* Reemplaza con tu logo */
                alt="Logo"
                width={32}
                height={32}
                className="flex-shrink-0"
              />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Chazu Inventory
              </span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              {/* GENERAL */}
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  GENERAL
                </div>
                <div className="space-y-1">
                  <NavItem href="/" icon={Home}>
                    Inicio
                  </NavItem>
                  <NavItem href="/estadisticas" icon={BarChart2}>
                    Estadísticas
                  </NavItem>
                  <NavItem href="/gestion-clientes" icon={Users2}>
                    Gestión Clientes
                  </NavItem>
                </div>
              </div>

              {/* INVENTARIO */}
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  INVENTARIO
                </div>
                <div className="space-y-1">
                  <NavItem href="/productos" icon={Package}>
                    Productos
                  </NavItem>
                  <NavItem href="/scanner" icon={Edit2}>
                    Modificaciones
                  </NavItem>
                  <NavItem href="/registro-cambios" icon={History}>
                    Registro de cambios
                  </NavItem>
                </div>
              </div>

              {/* PEDIDOS */}
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  PEDIDOS
                </div>
                <div className="space-y-1">
                  <NavItem href="/planificar" icon={Calendar}>
                    Planificar
                  </NavItem>
                  <NavItem href="/lista-pedidos" icon={List}>
                    Lista de Pedidos
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          {/* Opciones al final */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="/configuracion" icon={Settings}>
                Configuración
              </NavItem>
              <NavItem href="/ayuda" icon={HelpCircle}>
                Ayuda
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
