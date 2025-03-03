// src/routes/import.js
const express = require('express');
const router = express.Router();
const importController = require('../controllers/importController');

// Endpoint para importar productos desde Alegra vía Zapier
// Zapier enviará una petición POST a este endpoint con los datos del producto
router.post('/import-products', importController.importProducts);

module.exports = router;
