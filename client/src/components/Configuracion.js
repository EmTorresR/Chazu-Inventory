// client/src/components/Configuracion.js
import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { Settings, Save, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Configuracion = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [buttonState, setButtonState] = useState("idle"); // "idle", "submitting", "success"
  const navigate = useNavigate();

  useEffect(() => {
    // Opcional: cargar los valores actuales de la configuración
    // fetch('/api/config')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setEmail(data.ALEGRA_EMAIL);
    //     setToken(data.ALEGRA_TOKEN);
    //   });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonState("submitting");
    try {
      const response = await fetch("/api/config/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ALEGRA_EMAIL: email, ALEGRA_TOKEN: token }),
      });
      const data = await response.json();
      notification.success({
        message: "Actualización exitosa",
        description: data.message,
      });
      setButtonState("success");
      // Redirige al dashboard después de 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar configuración:", error);
      notification.error({
        message: "Error en la actualización",
        description: "No se pudo actualizar la configuración.",
      });
      setButtonState("idle");
    }
  };

  return (
    <div className="flex items-center justify-center sm:justify-start p-4">
      <div className="overflow-hidden max-w-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
        {/* Header del card */}
        <div className="p-4 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Configuración de Alegra
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Actualiza tus credenciales de integración
            </p>
          </div>
        </div>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs text-zinc-600 dark:text-zinc-300 mb-1">
              Alegra Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su email de Alegra"
              className="w-full h-9 px-4 bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 rounded-xl focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600 dark:text-zinc-300 mb-1">
              Alegra Token
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Ingrese su token de Alegra"
              className="w-full h-9 px-4 bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 rounded-xl focus:outline-none"
              required
            />
          </div>
          {/* Botón con animación y cambio de estado */}
          <div className="flex items-center">
            <div className="group relative inline-block">
              <button
                type="submit"
                disabled={buttonState === "submitting"}
                className={`relative overflow-hidden h-10 px-6 rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-500 ease-in-out ${
                  buttonState === "success" ? "bg-green-500" : "bg-blue-500"
                } ring-1 ring-indigo-500/20 shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-xs cursor-pointer`}
              >
                {/* Fondo SVG con degradado líquido */}
                <svg
                  className="absolute inset-0 w-full h-full z-0"
                  preserveAspectRatio="none"
                >
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#liquid-gradient-config)"
                  />
                  <defs>
                    <linearGradient
                      id="liquid-gradient-config"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="rgba(99,102,241,0.1)" />
                      <stop offset="50%" stopColor="rgba(99,102,241,0.2)" />
                      <stop offset="100%" stopColor="rgba(99,102,241,0.1)" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Contenido del botón */}
                <div className="relative flex items-center gap-3 text-white z-10">
                  {buttonState === "success" ? (
                    <>
                      <Check
                        className="w-4 h-4"
                        style={{ transform: "scale(0.93665) rotate(0deg)" }}
                      />
                      <span>¡Actualizado!</span>
                    </>
                  ) : (
                    <>
                      <Save
                        className="w-4 h-4"
                        style={{ transform: "scale(0.93665) rotate(57deg)" }}
                      />
                      <span>Actualizar Configuración</span>
                    </>
                  )}
                </div>
              </button>
              {/* Overlay animado que reacciona al hover del contenedor */}
              <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 transform scale-150 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Configuracion;
