//src/routes/productos.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Endpoint para crear un producto base.
router.post('/', productosController.crearProducto);

// Endpoint para obtener todos los productos base.
router.get('/', productosController.obtenerProductos);

// Endpoint para actualizar un producto base.
router.put('/:id', productosController.actualizarProducto);

module.exports = router;

