// client/src/components/ScannerQR.js
import React, { useEffect, useState } from "react";
import { Modal, Table, notification } from "antd";
import api from "../services/api";
import ScannerArea from "./ScannerArea";
import InventoryTableContainer from "./InventoryTableContainer";
import UpdateModal from "./UpdateModal";
import "./ScannerQR.css";

const ScannerQR = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [pendingUpdates, setPendingUpdates] = useState([]); // Actualizaciones pendientes
  const [productData, setProductData] = useState(null);
  const [scanningPaused, setScanningPaused] = useState(false);
  const [rows, setRows] = useState([]);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const [apiNotification, contextHolder] = notification.useNotification();

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

  const handleScanSuccess = (decodedText, decodedResult) => {
    console.log("Código QR escaneado:", decodedText);
    setScanResult(decodedText);
    let parsed;
    try {
      parsed = JSON.parse(decodedText);
    } catch (err) {
      parsed = { nombre: decodedText };
    }
    if (!parsed.variante) {
      parsed.variante = "";
    }
    const updatedProduct = rows.find((row) => {
      if (parsed.variante) {
        return (
          (row.codigo && row.codigo === parsed.codigo) ||
          (row.nombre && row.nombre === parsed.nombre)
        ) && row.variante === parsed.variante;
      }
      return (row.codigo && row.codigo === parsed.codigo) ||
        (row.nombre && row.nombre === parsed.nombre);
    });
  
    if (updatedProduct) {
      // Se hace una llamada a la API para obtener el stock actualizado
      api.get(`/variants/${updatedProduct.variantId}`)
        .then((response) => {
          // Se asume que response.data trae el objeto variant actualizado, incluyendo "stock"
          setProductData({
            ...updatedProduct,
            stock: response.data.stock,
          });
        })
        .catch((error) => {
          console.error("Error obteniendo stock actualizado:", error);
          // Si falla la llamada, se utiliza el dato local
          setProductData(updatedProduct);
        });
    } else {
      setProductData(parsed);
    }
  };
  

  const openScanner = () => setScannerVisible(true);
  const closeScanner = () => setScannerVisible(false);
  const closeOverlay = () => {
    setScanResult(null);
    setProductData(null);
    setScanningPaused(false);
  };

  const handleIncrement = (qty) => {
    if (productData && productData.variantId) {
      setPendingUpdates((prev) => {
        const others = prev.filter((u) => u.variantId !== productData.variantId);
        return [
          ...others,
          {
            variantId: productData.variantId,
            productId: productData.productId,
            nombre: productData.nombre,
            variante: productData.variante,
            oldStock: productData.stock,
            newStock: qty,
          },
        ];
      });
    }
  };

  const handleUpdate = () => {
    setUpdateModalVisible(true);
    setScanningPaused(false);
  };

  const handleStockEditorChange = (isOpen) => setScanningPaused(isOpen);

  const confirmUpdate = () => {
    api
      .post("/variants/update-stock", { updates: pendingUpdates })
      .then((response) => {
        console.log("Stock actualizado:", response.data);
        apiNotification.success({
          message: "Stock actualizado",
          description: "El stock se actualizó correctamente.",
          placement: "topLeft",
        });
        setPendingUpdates([]);
        setUpdateModalVisible(false);
        closeOverlay();
      })
      .catch((error) => {
        console.error("Error al actualizar stock:", error);
        apiNotification.error({
          message: "Error al actualizar",
          description: "Hubo un problema al actualizar el stock.",
          placement: "topLeft",
        });
      });
  };

  const cancelUpdate = () => setUpdateModalVisible(false);

  return (
    <div className="dashboard-container">
      {contextHolder}
      <h1>Dashboard de Inventario</h1>
  
      <div className="dashboard-button-container">
        <button className="qr-button" onClick={openScanner}>
          Escanear QR
        </button>
      </div>
  
      <div className="scanner-wrapper">
        <ScannerArea
          scannerVisible={scannerVisible}
          pause={scanningPaused}
          onScanSuccess={scanningPaused ? () => {} : handleScanSuccess}
          onCancel={closeScanner}
          scanResult={scanResult}
          productData={productData}
          onCloseOverlay={closeOverlay}
          pendingCount={pendingUpdates.length}
          onIncrement={handleIncrement}
          onUpdate={handleUpdate}
          onToggleDetails={() => {}}
          onStockEditorChange={handleStockEditorChange}
        />
      </div> 
  
      <UpdateModal
        visible={updateModalVisible}
        pendingUpdates={pendingUpdates}
        onConfirm={confirmUpdate}
        onCancel={cancelUpdate}
      />
    </div>
  );
};

export default ScannerQR;
