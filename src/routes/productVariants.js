// src/routes/productVariants.js
const express = require('express');
const router = express.Router();
const productVariantsController = require('../controllers/productVariantsController');
const stockController = require('../controllers/stockController');

// Endpoint para crear una variante para un producto específico.
// Se espera que se envíe el ID del producto en la URL.
router.post('/:productId/variants', productVariantsController.crearProductVariant);

// Endpoint para obtener todas las variantes de un producto.
router.get('/:productId/variants', productVariantsController.obtenerProductVariants);

// Endpoint para actualizar una variante específica (usando su ID).
router.put('/variants/:id', productVariantsController.actualizarProductVariant);

// Endpoint para actualización masiva de stock
router.post('/update-stock', stockController.bulkUpdateStock);

module.exports = router;
