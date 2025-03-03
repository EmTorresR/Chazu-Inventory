// client/src/components/InventoryTable.js
import React, { useMemo, useState, useEffect } from "react";
import { Table, Tag, Checkbox, Modal, Button, ConfigProvider } from "antd";
import "./InventoryTable.css";
import { LayoutGrid } from "lucide-react";

// Hook personalizado para detectar cambios en el modo oscuro
function useDarkMode() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

const InventoryTable = ({ rows }) => {
  // Utilizamos nuestro hook para detectar el modo oscuro
  const isDark = useDarkMode();
  console.log("Modal: isDark =", isDark);

  // Calcular filtros únicos para Equipo, Diseño, Variante y Tipo
  const equipoFilters = useMemo(() => {
    const equipos = rows.map((row) => row.equipo).filter((e) => e && e !== "-");
    return Array.from(new Set(equipos)).map((e) => ({ text: e, value: e }));
  }, [rows]);

  const disenoFilters = useMemo(() => {
    const disenos = rows.map((row) => row.diseño).filter((d) => d && d !== "-");
    return Array.from(new Set(disenos)).map((d) => ({ text: d, value: d }));
  }, [rows]);

  const varianteFilters = useMemo(() => {
    const variantes = rows
      .map((row) => row.variante)
      .filter((v) => v && v !== "");
    return Array.from(new Set(variantes)).map((v) => ({ text: v, value: v }));
  }, [rows]);

  const tipoFilters = useMemo(() => {
    const tipos = rows.map((row) => row.tipo).filter((t) => t && t !== "");
    return Array.from(new Set(tipos)).map((t) => ({ text: t, value: t }));
  }, [rows]);

  // Definir todas las columnas (excluyendo "ID Producto" e "ID Variante")
  const allColumns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      render: (text) => text || "-",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      filters: tipoFilters,
      filterSearch: true,
      onFilter: (value, record) => record.tipo === value,
    },
    {
      title: "Equipo",
      dataIndex: "equipo",
      key: "equipo",
      filters: equipoFilters,
      filterSearch: true,
      onFilter: (value, record) => record.equipo === value,
      render: (text) => text || "-",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      render: (text) => text || "-",
    },
    {
      title: "Diseño",
      dataIndex: "diseño",
      key: "diseño",
      filters: disenoFilters,
      filterSearch: true,
      onFilter: (value, record) => record.diseño === value,
      render: (diseño) =>
        diseño && diseño !== "-" ? (
          <Tag color="blue">
            <span className="font-bold">{diseño}</span>
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Variante",
      dataIndex: "variante",
      key: "variante",
      filters: varianteFilters,
      filterSearch: true,
      onFilter: (value, record) => record.variante === value,
      render: (variante) =>
        variante && variante !== "" ? (
          <Tag color="green">
            <span className="font-bold">{variante}</span>
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "QR Code",
      dataIndex: "qrCode",
      key: "qrCode",
      render: (qrCode) =>
        qrCode && qrCode.startsWith("data:image") ? (
          <img
            src={qrCode}
            alt="QR Code"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        ) : (
          "-"
        ),
    },
  ];

  // Estado para las columnas visibles (inicialmente todas)
  const allColumnKeys = allColumns.map((col) => col.key);
  const [visibleColumns, setVisibleColumns] = useState(allColumnKeys);

  // Filtrar las columnas según la selección del usuario
  const filteredColumns = allColumns.filter((col) =>
    visibleColumns.includes(col.key)
  );

  // Opciones para el Checkbox.Group, con labels adaptados a dark mode
  const checkboxOptions = allColumns.map((col) => ({
    label: (
      <span className="text-gray-900 dark:text-gray-100">{col.title}</span>
    ),
    value: col.key,
  }));

  // Estado para controlar el modal en dispositivos móviles
  const [columnModalVisible, setColumnModalVisible] = useState(false);

  // Definir el tema del modal basado en el modo actual
  const [modalTheme, setModalTheme] = useState({});
  useEffect(() => {
    if (isDark) {
      setModalTheme({
        components: {
          Modal: {
            headerBg: "#0F0F12",
            contentBg: "#0F0F12",
            footerBg: "transparent",
            titleColor: "#ffffff",
            titleFontSize: 16,
            titleLineHeight: 1.5,
          },
        },
      });
    } else {
      setModalTheme({
        components: {
          Modal: {
            headerBg: "#ffffff",
            contentBg: "#ffffff",
            footerBg: "transparent",
            titleColor: "rgba(0,0,0,0.88)",
            titleFontSize: 16,
            titleLineHeight: 1.5,
          },
        },
      });
    }
  }, [isDark]);

  return (
    <div>
      {/* Vista de escritorio: mostrar checkboxes inline */}
      <div className="mb-4 hidden sm:block">
        <span className="mr-2 font-semibold text-gray-900 dark:text-gray-100">
          Ajustar Columnas:
        </span>
        <Checkbox.Group
          options={checkboxOptions}
          value={visibleColumns}
          onChange={(checkedValues) => setVisibleColumns(checkedValues)}
        />
      </div>

      {/* Vista móvil: botón para abrir modal */}
      <div className="mb-4 block sm:hidden">
        <Button
          type="primary"
          onClick={() => setColumnModalVisible(true)}
          style={{ backgroundColor: "orange", borderColor: "orange" }}
          icon={<LayoutGrid className="h-4 w-4" />}
        >
          Ajustar columnas
        </Button>
      </div>

      {/* Modal con tema dinámico */}
      <ConfigProvider theme={modalTheme}>
        <Modal
          title="Ajustar columnas"
          open={columnModalVisible}
          onCancel={() => setColumnModalVisible(false)}
          onOk={() => setColumnModalVisible(false)}
          centered
        >
          <Checkbox.Group
            options={checkboxOptions}
            value={visibleColumns}
            onChange={(checkedValues) => setVisibleColumns(checkedValues)}
          />
        </Modal>
      </ConfigProvider>

      <Table
        className="custom-ant-table"
        columns={filteredColumns}
        dataSource={rows}
        rowKey="variantId"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default InventoryTable;
