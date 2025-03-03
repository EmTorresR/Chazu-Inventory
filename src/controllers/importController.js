// src/controllers/importController.js
const { Product, ProductVariant } = require('../models');
const QRCode = require('qrcode');

exports.importProducts = async (req, res) => {
  try {
    let data = req.body;
    // Si el payload está encapsulado en "payload", se parsea.
    if (data.payload) {
      data = JSON.parse(data.payload);
    }

    if (typeof data.codigo === 'undefined') {
      data.codigo = null;
    }

    let product;
    if (data.codigo) {
      product = await Product.findOne({ where: { codigo: data.codigo } });
    }
    if (!product) {
      product = await Product.findOne({ where: { nombre: data.nombre } });
    }

    if (!product) {
      product = await Product.create({
        nombre: data.nombre,
        codigo: data.codigo,
        tipo: data.tipo,
        descripcion: data.descripcion,
        equipo: data.equipo
      });
    } else {
      await product.update({
        nombre: data.nombre,
        codigo: data.codigo,
        tipo: data.tipo,
        descripcion: data.descripcion,
        equipo: data.equipo
      });
    }

    // Procesar variantes
    if (data.variants && Array.isArray(data.variants)) {
      for (const variantData of data.variants) {
        let variant = await ProductVariant.findOne({
          where: {
            productId: product.id,
            diseño: variantData.diseño,
            variante: variantData.variante
          }
        });
        if (!variant) {
          variant = await ProductVariant.create({
            productId: product.id,
            diseño: variantData.diseño,
            variante: variantData.variante,
            stock: variantData.stock,
            qrCode: ""  // Inicialmente vacío
          });
        } else {
          await variant.update({
            stock: variantData.stock
          });
        }

        // Construir el objeto que se codificará en el QR
        const qrPayload = {
          nombre: product.nombre,
          codigo: product.codigo,
          tipo: product.tipo,
          equipo: product.equipo,
          diseño: variantData.diseño,
          variante: variantData.variante,
          stock: variantData.stock
        };

        // Generar el código QR en formato Data URL
        const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrPayload));

        // Actualizar la variante con el código QR generado
        await variant.update({ qrCode: qrCodeDataURL });
      }
    }

    return res.status(200).json({ message: 'Importación exitosa', product });
  } catch (error) {
    console.error('Error al importar producto:', error);
    return res.status(500).json({ error: 'Error al importar producto', detalle: error });
  }
};
