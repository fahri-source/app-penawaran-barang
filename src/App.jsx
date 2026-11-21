import React, { useState, useRef } from "react";
import companyData from "./data/Company.json";
import Navbar from "./Component/Navbar";
import FormPenawaran from "./Component/FormPenawaran";
import PertinjauSurat from "./Component/PertinjaunSurat";
import { unduhSuratPdf } from "./utils/formatSurat";
import "../src/styles/style.css";

const createEmptyItem = () => ({
  id: Date.now() + Math.random(),
  namaBarang: "",
  qualitySpesifikasi: "",
  satuan: "Unit",
  jumlah: 1,
  hargaSatuan: 0,
});

export default function App() {
  const [activeTab, setActiveTab] = useState("beranda");
  const [isDownloading, setIsDownloading] = useState(false);
  const [logoSrc, setLogoSrc] = useState("");
  const suratRef = useRef(null);

  // A. Informasi Penawaran
  const [info, setInfo] = useState({
    nomorPenawaran: "",
    tanggalPenawaran: new Date().toISOString().split("T")[0],
    berlakuHingga: "",
    ditujukanKepada: "",
    alamatPenerima: "",
  });

  // B. Rincian
  const [items, setItems] = useState([createEmptyItem()]);

  // C. Perhitungan Catatan
  const [perhitungan, setPerhitungan] = useState({
    diskonPersen: 0,
    ppnPersen: 11,
    biayaTambahan: 0,
    catatanPenawaran: "",
    namaPenanggungJawab: "",
  });

  const subtotal = items.reduce(
    (sum, item) =>
      sum + (Number(item.jumlah) || 0) * (Number(item.hargaSatuan) || 0),
    0
  );
  const nominalDiskon =
    subtotal * ((Number(perhitungan.diskonPersen) || 0) / 100);
  const setelahDiskon = Math.max(0, subtotal - nominalDiskon);
  const nominalPpn =
    setelahDiskon * ((Number(perhitungan.ppnPersen) || 0) / 100);
  const totalAkhir =
    setelahDiskon + nominalPpn + (Number(perhitungan.biayaTambahan) || 0);

  const totals = { subtotal, nominalDiskon, nominalPpn, totalAkhir };

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddItem = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  const handleRemoveItem = (id) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUnduhPdf = async () => {
    if (!suratRef.current) return;
    setIsDownloading(true);
    try {
      await unduhSuratPdf(suratRef.current, info.nomorPenawaran);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar
        companyName={companyData.toko}
        logoSrc={logoSrc}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onUnduhPdf={handleUnduhPdf}
        isDownloading={isDownloading}
      />

      <main className="main-container">
        {activeTab === "beranda" ? (
          <>
            <FormPenawaran
              logoSrc={logoSrc}
              onLogoUpload={handleLogoUpload}
              onRemoveLogo={() => setLogoSrc("")}
              info={info}
              setInfo={setInfo}
              items={items}
              onItemChange={handleItemChange}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              perhitungan={perhitungan}
              setPerhitungan={setPerhitungan}
              totals={totals}
              onGoPreview={() => setActiveTab("pertinjau")}
              onUnduhPdf={handleUnduhPdf}
              isDownloading={isDownloading}
            />

            {/* Render surat di luar layar agar Unduh PDF di Navbar selalu siap */}
            <PertinjauSurat
              suratRef={suratRef}
              companyData={companyData}
              logoSrc={logoSrc}
              info={info}
              items={items}
              perhitungan={perhitungan}
              totals={totals}
              isHiddenMode={true}
            />
          </>
        ) : (
          <PertinjauSurat
            suratRef={suratRef}
            companyData={companyData}
            logoSrc={logoSrc}
            info={info}
            items={items}
            perhitungan={perhitungan}
            totals={totals}
            onBackBeranda={() => setActiveTab("beranda")}
            onUnduhPdf={handleUnduhPdf}
            isDownloading={isDownloading}
          />
        )}
      </main>
    </div>
  );
}