// src/config/database.js
const { Sequelize } = require('sequelize');

// Obtener las variables de entorno o usar valores por defecto
const DB_NAME = process.env.DB_NAME || 'bd_chazu';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '34577';
const DB_HOST = process.env.DB_HOST || 'localhost';

// Crea una instancia de Sequelize para conectarse a la base de datos MySQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,  // Usamos la variable de entorno, en Docker se debe configurar como "mysql"
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
