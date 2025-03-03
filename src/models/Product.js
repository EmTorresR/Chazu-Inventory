//src/models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipo: {
    type: DataTypes.STRING,  // Equivale al "Tipo" en el software contable (por ejemplo, "Bandera Satinada", "Chaqueta Rompevientos")
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  equipo: {
    type: DataTypes.STRING,  // Por ejemplo, "Atlético Nacional" (puede quedar vacío para productos que no tienen equipo)
    allowNull: true
  },
  // Las marcas de tiempo se gestionan automáticamente
}, {
  tableName: 'Products',
  timestamps: true
});

module.exports = Product;
