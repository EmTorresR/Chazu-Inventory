// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import PaginaPrueba from "./components/PaginaPrueba";
import ScannerQR from "./components/ScannerQR";
import Products from "./components/Products";
import Configuracion from "./components/Configuracion";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<PaginaPrueba />} />
          <Route path="/scanner" element={<ScannerQR />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
