// src/controllers/configController.js
const { Configuration } = require("../models");

const updateAlegraConfig = async (req, res) => {
  try {
    const { ALEGRA_EMAIL, ALEGRA_TOKEN } = req.body;
    if (!ALEGRA_EMAIL || !ALEGRA_TOKEN) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    await Configuration.upsert({ key: "ALEGRA_EMAIL", value: ALEGRA_EMAIL });
    await Configuration.upsert({ key: "ALEGRA_TOKEN", value: ALEGRA_TOKEN });

    res.json({ message: "Configuración actualizada correctamente." });
  } catch (error) {
    console.error("Error actualizando configuración:", error);
    res.status(500).json({ error: "Error actualizando configuración", detalle: error });
  }
};

module.exports = { updateAlegraConfig };
