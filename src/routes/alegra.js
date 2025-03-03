// src/routes/alegra.js
const express = require('express');
const { obtenerItemsAlegra, sincronizarItemsAlegra } = require('../controllers/alegraController');

const router = express.Router();

router.get('/items', obtenerItemsAlegra);
router.get('/sincronizar', sincronizarItemsAlegra);

module.exports = router;
