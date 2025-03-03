// src/models/Configuration.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Configuration = sequelize.define('Configuration', {
  key: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'Configurations',
  timestamps: false,
});

module.exports = Configuration;
