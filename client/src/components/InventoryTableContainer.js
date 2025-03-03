// client/src/components/InventoryTableContainer.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import InventoryTable from "./InventoryTable";

const InventoryTableContainer = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        const productos = response.data;
        const newRows = [];
        productos.forEach((producto) => {
          if (producto.variants && producto.variants.length > 0) {
            producto.variants.forEach((variant) => {
              newRows.push({
                productId: producto.id,
                nombre: producto.nombre,
                codigo: producto.codigo,
                tipo: producto.tipo,
                equipo: producto.equipo,
                descripcion: producto.descripcion,
                variantId: variant.id,
                diseño: variant.diseño,
                variante: variant.variante,
                stock: variant.stock,
                qrCode: variant.qrCode,
              });
            });
          } else {
            newRows.push({
              productId: producto.id,
              nombre: producto.nombre,
              codigo: producto.codigo,
              tipo: producto.tipo,
              equipo: producto.equipo,
              descripcion: producto.descripcion,
              variantId: "-",
              diseño: "-",
              variante: "-",
              stock: "-",
              qrCode: "-",
            });
          }
        });
        setRows(newRows);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  return (
    // Este contenedor evita que la tabla expanda el ancho global y activa scroll horizontal
    <div style={{ width: "100%", maxWidth: "100vw", overflowX: "auto" }}>
      <InventoryTable rows={rows} />
    </div>
  );
};

export default InventoryTableContainer;
