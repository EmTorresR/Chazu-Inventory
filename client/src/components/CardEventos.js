// client/src/components/CardEventos.js
import React from "react";
import { Calendar, ChevronRight, ArrowRight } from "lucide-react";

const CardEventos = () => {
  return (
    <div className="w-full sm:w-1/2 bg-gradient-to-r from-[#3877f5]/10 to-transparent dark:from-[#3877f5]/20 dark:to-transparent hover:from-[#3877f5]/30 dark:hover:from-[#3877f5]/40 transition-colors duration-300 rounded-lg p-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/80 dark:bg-zinc-900/80 rounded-md">
            <Calendar className="h-4 w-4 text-blue-500" />
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            Tareas pendientes
          </span>
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-white dark:ring-offset-zinc-950 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent text-gray-900 dark:text-white hover:bg-gradient-to-r hover:from-[#3877f5]/40 hover:to-transparent dark:hover:bg-gradient-to-r dark:hover:from-[#3877f5]/60 dark:hover:to-transparent h-9 rounded-md px-3 text-xs gap-1"
        >
          Ver todo
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-3">
        {/* Tarea 1 */}
        <div className="flex items-center gap-3 p-2 rounded-md bg-white/50 dark:bg-zinc-900/50 hover:bg-gradient-to-r hover:from-[#3877f5]/40 hover:to-transparent dark:hover:bg-gradient-to-r dark:hover:from-[#3877f5]/60 dark:hover:to-transparent transition-colors group">
          <div className="w-1 h-8 rounded-sm bg-blue-500"></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold truncate text-gray-900 dark:text-white">
                Imprimir coleccion Nacional x5
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300">
              <span>Hoy</span>
              <span>•</span>
              <span>10:00 AM</span>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity" tabIndex="0">
            <div className="p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800">
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Tarea 2 */}
        <div className="flex items-center gap-3 p-2 rounded-md bg-white/50 dark:bg-zinc-900/50 hover:bg-gradient-to-r hover:from-[#3877f5]/40 hover:to-transparent dark:hover:bg-gradient-to-r dark:hover:from-[#3877f5]/60 dark:hover:to-transparent transition-colors group">
          <div className="w-1 h-8 rounded-sm bg-amber-500"></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold truncate text-gray-900 dark:text-white">
                Facturar pedido Jairo
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300">
              <span>Mañana</span>
              <span>•</span>
              <span>1:00 PM</span>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity" tabIndex="0">
            <div className="p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800">
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Tarea 3 */}
        <div className="flex items-center gap-3 p-2 rounded-md bg-white/50 dark:bg-zinc-900/50 hover:bg-gradient-to-r hover:from-[#3877f5]/40 hover:to-transparent dark:hover:bg-gradient-to-r dark:hover:from-[#3877f5]/60 dark:hover:to-transparent transition-colors group">
          <div className="w-1 h-8 rounded-sm bg-blue-500"></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold truncate text-gray-900 dark:text-white">
                Entregar Pedidos Centro
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300">
              <span>Mié</span>
              <span>•</span>
              <span>5:00 PM</span>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity" tabIndex="0">
            <div className="p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800">
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Tarea 4 */}
        <div className="flex items-center gap-3 p-2 rounded-md bg-white/50 dark:bg-zinc-900/50 hover:bg-gradient-to-r hover:from-[#3877f5]/40 hover:to-transparent dark:hover:bg-gradient-to-r dark:hover:from-[#3877f5]/60 dark:hover:to-transparent transition-colors group">
          <div className="w-1 h-8 rounded-sm bg-red-500"></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold truncate text-gray-900 dark:text-white">
                Comprar tela satinada
              </span>
              <div
                className="inline-flex items-center px-2.5 py-0.5 font-semibold transition-colors rounded-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px]"
              >
                llamar
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300">
              <span>Mañana</span>
              <span>•</span>
              <span>9:00 AM</span>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity" tabIndex="0">
            <div className="p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800">
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Sección inferior con estados */}
      <div className="mt-3 pt-3 border-t border-zinc-200/50 dark:border-zinc-700/50">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-300">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-blue-500"></div>
              <span>En Progreso</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-amber-500"></div>
              <span>Pendiente</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-red-500"></div>
              <span>Urgente</span>
            </div>
          </div>
          <span>Próximos 7 días</span>
        </div>
      </div>
    </div>
  );
};

export default CardEventos;
