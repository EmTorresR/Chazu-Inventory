// src/models/ProductVariant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductVariant = sequelize.define('ProductVariant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  diseño: {
    type: DataTypes.STRING,
    allowNull: false
  },
  variante: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  qrCode: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Campo para almacenar el id de Alegra (ya agregado previamente)
  idAlegra: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Nuevo campo para almacenar el costo unitario de la variante
  unitCost: {
    type: DataTypes.INTEGER,  // Puedes usar INTEGER o DECIMAL según necesites
    allowNull: true,          // O false, si es obligatorio
    defaultValue: 0
  }
}, {
  tableName: 'ProductVariants',
  timestamps: true
});

module.exports = ProductVariant;



