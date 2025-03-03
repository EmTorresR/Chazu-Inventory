// src/routes/config.js
const express = require("express");
const { updateAlegraConfig } = require("../controllers/configController");

const router = express.Router();

router.put("/update", updateAlegraConfig);

module.exports = router;
