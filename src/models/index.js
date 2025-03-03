// src/models/index.js
const Product = require('./Product');
const ProductVariant = require('./ProductVariant');
const Configuration = require('./Configuration'); // Nuevo modelo

// Un producto tiene muchas variantes
Product.hasMany(ProductVariant, {
  foreignKey: 'productId',
  as: 'variants'
});

// Cada variante pertenece a un producto
ProductVariant.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});

module.exports = {
  Product,
  ProductVariant,
  Configuration,  // Se exporta el modelo de configuración
};
