// client/src/components/ProductCard.js
import React, { useState } from 'react';
import { Card, Avatar, Badge, Input, Button } from 'antd';
import { CloseOutlined, PlusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './ProductCard.css';

const { Meta } = Card;

const ProductCard = ({ product, onClose, pendingCount, onIncrement, onUpdate, onToggleDetails, onStockEditorChange }) => {
  const [showStockEditor, setShowStockEditor] = useState(false);
  const [stockInput, setStockInput] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const toggleStockEditor = () => {
    const newState = !showStockEditor;
    setShowStockEditor(newState);
    if (onStockEditorChange) onStockEditorChange(newState);
  };

  // Modificado: ahora se llama onStockEditorChange(false) para reanudar el escáner
  const handleFollowScanning = () => {
    const qty = stockInput ? Number(stockInput) : 1;
    onIncrement(qty);
    setShowStockEditor(false);
    setStockInput('');
    if (onStockEditorChange) onStockEditorChange(false);
  };

  const handleUpdateStock = () => {
    if (stockInput.trim() !== '') {
      const qty = Number(stockInput);
      onIncrement(qty);
    }
    onUpdate();
    setShowStockEditor(false);
    setStockInput('');
    if (onStockEditorChange) onStockEditorChange(false);
  };

  return (
    <Card
      className="product-card"
      style={{ width: "100%" }}
      actions={[
        <CloseOutlined 
          key="close" 
          onClick={onClose} 
          style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }} />,
        <Badge count={pendingCount} key="update">
          <span 
            onClick={toggleStockEditor}
            style={{ userSelect: 'none', cursor: 'pointer', display: 'inline-block' }}
          >
            <PlusCircleOutlined style={{ color: 'green', fontSize: '18px' }} />
          </span>
        </Badge>,
        <InfoCircleOutlined 
          key="info" 
          onClick={() => setShowDetails(!showDetails)} 
          style={{ color: 'blue', fontSize: '18px', cursor: 'pointer' }} />,
      ]}
    >
      <Meta
        avatar={<Avatar src="/images/Avatar.png" />}
        title={product.nombre}
        description={
          <div className="product-details">
            <p><strong>Diseño:</strong> {product.diseño}</p>
            <p><strong>Variante:</strong> {product.variante || '-'}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            {showDetails && (
              <div className="extra-details">
                <p><strong>Código:</strong> {product.codigo}</p>
                <p><strong>Tipo:</strong> {product.tipo}</p>
                <p><strong>Equipo:</strong> {product.equipo || '-'}</p>
              </div>
            )}
            {showStockEditor && (
              <div className="stock-editor">
                <Input
                  type="number"
                  placeholder="Ingresar nueva cantidad"
                  value={stockInput}
                  onChange={(e) => setStockInput(e.target.value)}
                  style={{ width: "100%", marginBottom: "5px" }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    type="primary" 
                    onClick={handleUpdateStock}
                    style={{ backgroundColor: 'green', borderColor: 'green' }}
                  >
                    Actualizar
                  </Button>
                  <Button onClick={handleFollowScanning}>
                    Seguir Escaneando
                  </Button>
                </div>
              </div>
            )}
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;
