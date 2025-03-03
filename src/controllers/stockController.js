// src/controllers/stockController.js
const { ProductVariant } = require("../models");
const alegraswaggerTest = require("@api/alegraswagger-test");

exports.bulkUpdateStock = async (req, res) => {
  try {
    const updates = req.body.updates;

    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ error: 'Debe enviar un arreglo de actualizaciones en "updates"' });
    }

    // Obtener la fecha actual en formato YYYY-MM-DD para Colombia
    const formattedDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(new Date());


    // Medir el tiempo de actualización en la BD
    console.time("DBUpdate");
    await Promise.all(
      updates.map((update) =>
        ProductVariant.update(
          { stock: update.newStock },
          { where: { id: update.variantId } }
        )
      )
    );
    console.timeEnd("DBUpdate");

    // Optimización: Recuperar todas las variantes de una sola vez
    const variantIds = updates.map(update => update.variantId);
    const variants = await ProductVariant.findAll({
      where: { id: variantIds }
    });
    const variantMap = {};
    variants.forEach(variant => {
      variantMap[variant.id] = variant;
    });

    // Preparar el arreglo de items para la llamada a Alegra
    const itemsForAlegra = updates.map(update => {
      const variant = variantMap[update.variantId];
      if (variant && variant.idAlegra) {
        return {
          type: "in",
          id: variant.idAlegra.toString(),
          unitCost: variant.unitCost || 0,
          quantity: update.newStock,
        };
      }
      return null;
    }).filter(item => item !== null);

    // Medir el tiempo de actualización en Alegra con la llamada batch
    console.time("AlegraUpdate");
    if (itemsForAlegra.length > 0) {
      const payload = {
        warehouse: { id: "1" },
        date: formattedDate,
        items: itemsForAlegra,
      };
      await alegraswaggerTest.postInventoryAdjustments(payload);
    }
    console.timeEnd("AlegraUpdate");

    return res.status(200).json({ message: "Stock actualizado exitosamente." });
  } catch (error) {
    console.error("Error en bulkUpdateStock:", error);
    return res.status(500).json({ error: "Error al actualizar stock", details: error.message });
  }
};
