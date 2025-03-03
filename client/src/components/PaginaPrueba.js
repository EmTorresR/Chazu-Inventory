// client/src/components/PaginaPrueba.js
import React from "react";
import Minicards from "./Minicards";
import CardEventos from "./CardEventos";
import PreviewPedidosPend from "./PreviewPedidosPend";
import "./PaginaPrueba.css";

const PaginaPrueba = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl sm:text-3xl font-bold shimmer-text">
        Dashboard
      </h1>
      {/* Minicards */}
      <div className="mt-6 w-full">
        <Minicards />
      </div>
      {/* CardEventos */}
      <div className="mt-6">
        <CardEventos />
      </div>
      {/* PreviewPedidosPend */}
      <div className="mt-6">
        <PreviewPedidosPend />
      </div>
      <style>{`
        .shimmer-text {
          --shimmer-color-start: #f1f5f9;
          --shimmer-color-mid: #0175a4;
          background: linear-gradient(
              90deg,
              var(--shimmer-color-start) 0%,
              var(--shimmer-color-start) 40%,
              var(--shimmer-color-mid) 50%,
              var(--shimmer-color-start) 60%,
              var(--shimmer-color-start) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 2.5s infinite linear;
        }

        @media (prefers-color-scheme: dark) {
          .shimmer-text {
            --shimmer-color-start: #f1f5f9;
            --shimmer-color-mid: #0175a4;
          }
        }

        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  );
};

export default PaginaPrueba;
