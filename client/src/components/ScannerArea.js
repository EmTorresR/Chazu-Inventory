// client/src/components/ScannerArea.js
import React from "react";
import Html5QrScanner from "./Html5QrScanner";
import ProductCard from "./ProductCard";
import "./ScannerArea.css"; // Opcional para 

const ScannerArea = ({
  scannerVisible,
  pause,
  onScanSuccess,
  onCancel,
  scanResult,
  productData,
  onCloseOverlay,
  pendingCount,
  onIncrement,
  onUpdate,
  onToggleDetails,
  onStockEditorChange,
}) => {
  return (
    <div className="scanner-area">
      <Html5QrScanner
        scannerVisible={scannerVisible}
        onScanSuccess={pause ? () => {} : onScanSuccess}
        onCancel={onCancel}
        pause={pause}
      />
      {scanResult && productData && (
        <div className="overlay">
          <ProductCard
            product={productData}
            onClose={onCloseOverlay}
            pendingCount={pendingCount}
            onIncrement={onIncrement}
            onUpdate={onUpdate}
            onToggleDetails={onToggleDetails}
            onStockEditorChange={onStockEditorChange}
          />
        </div>
      )}
    </div>
  );
};

export default ScannerArea;
