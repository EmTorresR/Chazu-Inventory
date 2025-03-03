// client/src/components/Html5QrScanner.js
import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './Html5QrScanner.css';

const Html5QrScanner = ({ scannerVisible, onScanSuccess, onCancel, pause }) => {
  const qrCodeRegionId = "reader";
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (scannerVisible && !html5QrCodeRef.current) {
      const config = { fps: 10, qrbox: 250 };
      html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);
      html5QrCodeRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText, decodedResult) => {
          if (pause) {
            // Si está pausado, ignoramos el evento de escaneo
            return;
          }
          onScanSuccess(decodedText, decodedResult);
        },
        (scanError) => {
          console.warn("Error durante el escaneo:", scanError);
        }
      ).catch((err) => {
        console.error("Error al iniciar el escáner:", err);
      });
    }
    // Cleanup: detener el escáner si el visor se oculta
    return () => {
      if (!scannerVisible && html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().then(() => {
          html5QrCodeRef.current.clear();
          html5QrCodeRef.current = null;
        }).catch((err) => {
          console.error("Error al detener el escáner:", err);
        });
      }
    };
  }, [scannerVisible, onScanSuccess]);

  // Efecto para pausar o reanudar el escaneo según la prop "pause"
  useEffect(() => {
    if (html5QrCodeRef.current) {
      if (pause && typeof html5QrCodeRef.current.pause === 'function') {
        const pauseResult = html5QrCodeRef.current.pause();
        if (pauseResult && typeof pauseResult.catch === 'function') {
          pauseResult.catch(err => {
            console.error("Error al pausar el escáner:", err);
          });
        }
      } else if (!pause && typeof html5QrCodeRef.current.resume === 'function') {
        const resumeResult = html5QrCodeRef.current.resume();
        if (resumeResult && typeof resumeResult.catch === 'function') {
          resumeResult.catch(err => {
            console.error("Error al reanudar el escáner:", err);
          });
        }
      }
    }
  }, [pause]);

  if (!scannerVisible) {
    return null;
  }

  return (
    <div className="scanner-container" id={qrCodeRegionId}>
      <button className="cancel-button" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  );
};

export default Html5QrScanner;
