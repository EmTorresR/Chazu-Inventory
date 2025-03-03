// client/src/components/PreviewPedidosPend.js
import React from "react";
import { cn } from "../lib/utils.ts";
import {
  Calendar,
  ArrowRight,
  Flag,
  Scissors,
  Bus,
  Clock,
  Loader2,
} from "lucide-react";

const statusConfig = {
  pending: {
    icon: Clock,
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
  },
  "in-progress": {
    icon: Loader2,
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
  },
};

const ITEMS = [
  {
    id: "1",
    title: "Nacional x5",
    name: "Guillermo",
    icon: Flag,
    status: "in-progress",
    progress: 65,
    objectiveQuantity: "50 banderas",
    date: "Objetivo: 2 Mar",
  },
  {
    id: "2",
    title: "Bufandas Nal • Mill • Amer",
    name: "Guillermo",
    icon: Scissors,
    status: "pending",
    progress: 30,
    objectiveQuantity: "10 Bufandas",
    date: "Objetivo: 5 Mar",
  },
  {
    id: "3",
    title: "Forros Brasilia",
    name: "Jairo",
    icon: Bus,
    status: "in-progress",
    progress: 45,
    objectiveQuantity: "2 paquetes",
    date: "Objetivo: 6 Mar",
  },
];

export default function PreviewPedidosPend({ items = ITEMS, className }) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      {/* En móvil: ancho fijo de 280px; en PC se muestra en forma de grilla */}
      <div className="flex gap-4 flex-nowrap sm:flex-wrap sm:justify-start w-[280px] sm:w-full">
        {items.map((item) => {
          const Icon = item.icon;
          const statusText =
            item.status === "in-progress" ? "En-Progreso" : "Pendiente";
          const statusStyle = statusConfig[item.status];
          return (
            <div
              key={item.id}
              className={cn(
                "relative flex flex-col bg-gradient-to-r from-[#38dff5]/10 to-transparent dark:from-[#38dff5]/20 dark:to-transparent rounded-xl p-3 transition-all duration-200 shadow-sm backdrop-blur-xl group",
                "w-[280px]"
              )}
            >
              {/* Overlay de hover: aparece solo en el ítem seleccionado */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-all duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to right, rgba(56,223,245,0.3), transparent)",
                }}
              ></div>
              {/* Contenido principal (en capa superior) */}
              <div className="relative z-10">
                {/* Encabezado: ícono, título y etiqueta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg shrink-0 bg-white dark:bg-zinc-800">
                      <Icon className="w-4 h-4 text-gray-900 dark:text-white" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                        {item.name}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${statusStyle.bg} ${statusStyle.text}`}
                  >
                    {React.createElement(statusStyle.icon, {
                      className: "w-3 h-3",
                    })}
                    {statusText}
                  </div>
                </div>
                {/* Progreso */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-300">
                      Progreso
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-gray-900 dark:bg-gray-100 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                {/* Objetivo */}
                <div className="mt-2">
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    <span className="font-bold">{item.objectiveQuantity}</span>{" "}
                    Objetivo
                  </p>
                </div>
                {/* Fecha objetivo */}
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 mt-2">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>{item.date}</span>
                </div>
                {/* Divider y botón "Ver Detalles" */}
                <div className="mt-2 border-t border-zinc-100 dark:border-zinc-800 pt-2">
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium transition-colors rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gradient-to-r hover:from-[#38dff5]/20 hover:to-transparent dark:hover:bg-gradient-to-r dark:hover:from-[#38dff5]/30 dark:hover:to-transparent"
                  >
                    Ver Detalles
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
