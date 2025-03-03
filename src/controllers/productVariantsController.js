// src/controllers/productVariantsController.js
const { ProductVariant, Product } = require('../models');

exports.crearProductVariant = async (req, res) => {
  try {
    const { productId } = req.params;
    // Opcional: validar que el producto base exista
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto base no encontrado' });
    }

    const { diseño, variante, stock, qrCode } = req.body;
    const nuevaVariante = await ProductVariant.create({
      productId,
      diseño,
      variante,
      stock,
      qrCode
    });
    res.status(201).json(nuevaVariante);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la variante', detalle: error });
  }
};

exports.obtenerProductVariants = async (req, res) => {
  try {
    const { productId } = req.params;
    const variants = await ProductVariant.findAll({
      where: { productId }
    });
    res.json(variants);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener variantes', detalle: error });
  }
};

exports.actualizarProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await ProductVariant.findByPk(id);
    if (!variant) {
      return res.status(404).json({ error: 'Variante no encontrada' });
    }
    await variant.update(req.body);
    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la variante', detalle: error });
  }
};
