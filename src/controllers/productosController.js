// src/controllers/productosController.js
const { Product, ProductVariant } = require("../models");

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.findAll({
      include: [{ model: ProductVariant, as: "variants" }],
    });
    res.json(productos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener productos", detalle: error });
  }
};

exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await Product.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el producto", detalle: error });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar producto", detalle: error });
  }
};
