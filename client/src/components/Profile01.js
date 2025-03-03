// client/src/components/Profile01.js
import React from "react";
import { LogOut, MoveUpRight, Settings, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const defaultProfile = {
  name: "Edison P.",
  role: "Contador",
};

export default function Profile01({
  name = defaultProfile.name,
  role = defaultProfile.role,
}) {
  const menuItems = [
    {
      label: "Configuración",
      href: "#",
      icon: <Settings className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
      external: false,
    },
    {
      label: "Términos y condiciones",
      href: "#",
      icon: <FileText className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
      external: true,
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="relative px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative shrink-0">
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
                size={72}
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>
            {/* Información del perfil */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {name}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">{role}</p>
            </div>
          </div>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-6" />
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {item.label}
                  </span>
                </div>
                {item.external && (
                  <MoveUpRight className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                )}
              </Link>
            ))}
            <button
              type="button"
              className="w-full flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Cerrar sesión
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
