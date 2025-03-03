// client/src/components/Minicards.js
import React, { useEffect, useRef, useState } from "react";
import { Users2, ClipboardList } from "lucide-react";

const Minicards = () => {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const [maxHeight, setMaxHeight] = useState("auto");

  useEffect(() => {
    if (window.innerWidth >= 640) {
      const h1 = card1Ref.current ? card1Ref.current.offsetHeight : 0;
      const h2 = card2Ref.current ? card2Ref.current.offsetHeight : 0;
      const max = Math.max(h1, h2);
      setMaxHeight(max);
    } else {
      setMaxHeight("auto");
    }
  }, []);

  return (
    <div className="w-full overflow-x-auto snap-x snap-mandatory">
      <div className="flex gap-4 flex-nowrap sm:grid sm:grid-cols-2 sm:gap-4 w-[280px] sm:w-full">
        {/* Minicard 1: Fondo degradado verde esmeralda */}
        <div className="min-w-[280px] sm:min-w-0 snap-start">
          <div
            ref={card1Ref}
            className="relative group bg-gradient-to-r from-emerald-500/10 to-transparent dark:from-emerald-500/20 dark:to-transparent rounded-xl p-3 hover:shadow-md transition-all duration-200"
            style={{ height: maxHeight }}
          >
            {/* Capa overlay para el efecto hover */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-all duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to right, rgba(16,185,129,0.4), transparent)",
              }}
            ></div>
            <div className="flex items-start gap-2 sm:gap-3 relative z-10">
              <div className="p-2 rounded-lg shrink-0 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Users2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-300 truncate">
                  Pedidos por cumplir
                </p>
                <p className="text-sm font-bold mt-0.5 truncate text-gray-900 dark:text-white">
                  3 ordenes
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5 truncate">
                  Programado esta semana
                </p>
              </div>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md px-2 py-1 h-7 shrink-0 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950">
                Programar
              </button>
            </div>
          </div>
        </div>

        {/* Minicard 2: Fondo degradado amarillo */}
        <div className="min-w-[280px] sm:min-w-0 snap-start">
          <div
            ref={card2Ref}
            className="relative group bg-gradient-to-r from-amber-500/10 to-transparent dark:from-amber-500/20 dark:to-transparent rounded-xl p-3 hover:shadow-md transition-all duration-200"
            style={{ height: maxHeight }}
          >
            {/* Capa overlay para el efecto hover */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-all duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to right, rgba(245,158,11,0.4), transparent)",
              }}
            ></div>
            <div className="flex items-start gap-2 sm:gap-3 relative z-10">
              <div className="p-2 rounded-lg shrink-0 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <ClipboardList className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-300 truncate">
                  Actualizaciones Stock
                </p>
                <p className="text-sm font-bold mt-0.5 truncate text-gray-900 dark:text-white">
                  5 cambios nuevos
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5 truncate">
                  Ultimos 7 dias
                </p>
              </div>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md px-2 py-1 h-7 shrink-0 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950">
                Revisar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Minicards;
