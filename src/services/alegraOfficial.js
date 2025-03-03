// src/services/alegraOfficial.js
const alegraswaggerTest = require('@api/alegraswagger-test');
const dotenv = require('dotenv');
dotenv.config();
const { Configuration } = require('../models'); // Asegúrate de tener este modelo configurado

// Función para actualizar la autenticación de Alegra desde la base de datos
const updateAuth = async () => {
  try {
    // Intentar obtener las credenciales almacenadas en la BD
    const emailSetting = await Configuration.findOne({ where: { key: "ALEGRA_EMAIL" } });
    const tokenSetting = await Configuration.findOne({ where: { key: "ALEGRA_TOKEN" } });
    const email = emailSetting ? emailSetting.value : process.env.ALEGRA_EMAIL;
    const token = tokenSetting ? tokenSetting.value : process.env.ALEGRA_TOKEN;
    // Actualiza la autenticación en el cliente de Alegra
    alegraswaggerTest.auth(email, token);
  } catch (error) {
    // En caso de error, se usa el .env
    alegraswaggerTest.auth(process.env.ALEGRA_EMAIL, process.env.ALEGRA_TOKEN);
  }
};

const getAlegraItems = async () => {
  try {
    // Actualiza las credenciales dinámicamente antes de la llamada
    await updateAuth();
    const params = {
      // Traer solo los campos necesarios
      fields: "id,name,reference,description,itemCategory,inventory,customFields,type"
    };
    const { data } = await alegraswaggerTest.getItems(params);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAlegraItems };

