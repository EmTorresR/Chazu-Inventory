// src/controllers/alegraController.js
const { getAlegraItems } = require("../services/alegraOfficial");
const { Product, ProductVariant } = require("../models");
const QRCode = require("qrcode");

/**
 * Función para obtener los ítems de Alegra sin transformación.
 */
const obtenerItemsAlegra = async (req, res) => {
  try {
    const items = await getAlegraItems();
    res.json(items);
  } catch (error) {
    console.error("Error al obtener ítems de Alegra:", error);
    res.status(500).json({ error: "Error al obtener ítems de Alegra", detalle: error });
  }
};

/**
 * Función para transformar el item de Alegra y extraer solo los campos necesarios.
 */
const transformItem = (item) => {
  // Extraer valores de customFields para "equipo" y "diseño"
  const equipoField = item.customFields?.find(cf => cf.name.toLowerCase() === "equipo");
  const disenoField = item.customFields?.find(cf => cf.name.toLowerCase() === "diseño");
  const equipo = equipoField ? equipoField.value : "";
  const disenoCustom = disenoField ? disenoField.value : "";

  // Definir tipo usando itemCategory.name o item.type
  const tipo = (item.itemCategory && item.itemCategory.name) ? item.itemCategory.name : item.type;
  const unitCost = item.inventory ? item.inventory.unitCost : 0;
  const availableQuantity = item.inventory ? item.inventory.availableQuantity : 0;

  // Separar variante si el nombre contiene " / "
  let nombre = item.name;
  let variante = "";
  if (nombre.includes(" / ")) {
    const parts = nombre.split(" / ");
    nombre = parts[0].trim();
    if (parts.length > 1) {
      variante = parts[1].trim();
    }
  }

  return {
    idAlegra: item.id,
    nombre,
    codigo: item.reference,
    descripcion: item.description || "",
    tipo,
    equipo,
    diseno: disenoCustom,
    inventory: { unitCost, availableQuantity },
    variante,
  };
};

/**
 * Sincroniza los ítems de Alegra con la base de datos.
 * Se comparan los valores de stock (y unitCost, opcional) para detectar cambios.
 * Se cuentan los nuevos registros y las variantes actualizadas.
 */
const sincronizarItemsAlegra = async (req, res) => {
  try {
    // Obtener ítems de Alegra (optimizado con fields en el servicio)
    const items = await getAlegraItems();
    console.log("Datos obtenidos de Alegra antes de sincronización:", JSON.stringify(items, null, 2));

    // Contadores para nuevos registros y cambios
    let countNew = 0;
    let countChanged = 0;

    for (const item of items) {
      const transformed = transformItem(item);

      // CONSOLIDAR EL PRODUCTO BASE (ítem padre) usando "codigo"
      let product = await Product.findOne({ where: { codigo: transformed.codigo } });
      if (!product) {
        product = await Product.create({
          nombre: transformed.nombre,
          codigo: transformed.codigo,
          tipo: transformed.tipo,
          descripcion: transformed.descripcion,
          equipo: transformed.equipo,
        });
      } else {
        await product.update({
          nombre: transformed.nombre,
          tipo: transformed.tipo,
          descripcion: transformed.descripcion,
          equipo: transformed.equipo,
        });
      }

      // Si el item es el padre (variantParent), actualizamos el idAlegra en el producto
      if (item.type === "variantParent") {
        await product.update({ idAlegra: item.id });
      }

      // Procesar variantes (ítems que no son el padre)
      if (item.type !== "variantParent") {
        let variant = await ProductVariant.findOne({
          where: {
            productId: product.id,
            diseño: transformed.diseno,
            variante: transformed.variante,
          },
        });

        // Si la variante no existe, la creamos y contamos como nuevo registro
        if (!variant) {
          variant = await ProductVariant.create({
            productId: product.id,
            diseño: transformed.diseno,
            variante: transformed.variante,
            stock: transformed.inventory.availableQuantity,
            qrCode: "",
            idAlegra: item.id,
            unitCost: transformed.inventory.unitCost,
          });
          countNew++;
        } else {
          // Si existe, comparar el stock (y unitCost si se desea)
          const currentStock = variant.stock;
          // Solo consideramos como cambio si hay diferencia en stock
          if (currentStock !== transformed.inventory.availableQuantity) {
            await variant.update({
              stock: transformed.inventory.availableQuantity,
              idAlegra: item.id,
              unitCost: transformed.inventory.unitCost,
            });
            countChanged++;
          }
        }

        // Generar el QR Code para la variante
        const qrPayload = {
          nombre: product.nombre,
          codigo: product.codigo,
          tipo: product.tipo,
          equipo: product.equipo,
          diseño: transformed.diseno,
          variante: transformed.variante,
          stock: transformed.inventory.availableQuantity,
        };

        const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrPayload));
        await variant.update({ qrCode: qrCodeDataURL });
      }
    }

    // Crear un mensaje final basado en los contadores
    let finalMessage = "";
    if (countNew === 0 && countChanged === 0) {
      finalMessage += "no hubo cambios.";
    } else {
      if (countNew > 0) {
        finalMessage += `Se han agregado ${countNew} nuevos producto(s). `;
      }
      if (countChanged > 0) {
        finalMessage += `Se han actualizado ${countChanged} producto(s).`;
      }
    }

    res.json({
      message: finalMessage,
      updatedCount: countNew + countChanged,
      countNew,
      countChanged,
    });
  } catch (error) {
    console.error("Error en sincronización:", error);
    res.status(500).json({ error: "Error en sincronización", detalle: error });
  }
};

module.exports = { obtenerItemsAlegra, sincronizarItemsAlegra };
