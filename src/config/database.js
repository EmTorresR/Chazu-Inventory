// src/config/database.js
const { Sequelize } = require('sequelize');

// Crea una instancia de Sequelize para conectarse a la base de datos MySQL
const sequelize = new Sequelize('bd_chazu', 'root', '34577', {
  host: 'localhost',  // Cambia este valor si tu MySQL se encuentra en otra IP o contenedor
  dialect: 'mysql',   // Indicamos que usaremos MySQL
  logging: false,     // Cambia a console.log para ver los queries de SQL (útil para debug)
});

// Mensaje para confirmar que el archivo se ha cargado
console.log('Archivo database.js cargado. Intentando conectar a MySQL...');

// Función para probar la conexión a la base de datos
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL exitosa.');
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
  }
}

testConnection();

// Exportamos la instancia de sequelize para usarla en otros módulos
module.exports = sequelize;
