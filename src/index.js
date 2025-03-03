// src/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importación de rutas
const alegraRoutes = require('./routes/alegra');
const productosRoutes = require('./routes/productos');
const productVariantsRoutes = require('./routes/productVariants');
const importRoutes = require('./routes/import');
const configRoutes = require("./routes/config");

// Montar las rutas
app.use('/api/alegra', alegraRoutes);
app.use('/api/products', productosRoutes);
app.use('/api/variants', productVariantsRoutes); // Puedes asignar un subpath específico para variantes
app.use('/api/import', importRoutes);           // Y otro para la importación
app.use("/api/config", configRoutes);

// Sincronización de modelos
const sequelize = require('./config/database');
const { Product, ProductVariant } = require('./models');

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos.");
  })
  .catch((error) => {
    console.error("Error al sincronizar modelos:", error);
  });

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Hola! La API de Inventario está corriendo.");
});

// Iniciar el servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});

