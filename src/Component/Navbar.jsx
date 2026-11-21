import React from "react";
import { getLogoPerusahaan } from "../utils/logoDefault";

export default function Navbar({
  companyName,
  logoSrc,
  activeTab,
  setActiveTab,
  onUnduhPdf,
  isDownloading,
}) {
  const activeLogo = getLogoPerusahaan(logoSrc);

  return (
    <header className="top-header-wrapper">
      {/* BAGIAN ATAS: LOGO KIRI + JUDUL KANAN */}
      <div className="hero-banner">
        <div className="hero-logo-card">
          <img
            src={activeLogo}
            alt="Logo All Jaring Safety"
            className="hero-logo-img"
          />
        </div>

        <div className="hero-text-group">
          <span className="hero-eyebrow">
            {(companyName || "ALL JARING SAFETY").toUpperCase()}
          </span>
          <h1 className="hero-title">Pembuat Surat Penawaran</h1>
          <p className="hero-subtitle">
            Susun rincian barang dan unduh dokumen penawaran siap kirim.
          </p>
        </div>
      </div>

      {/* BAR MENU NAVIGASI */}
      <nav className="navbar-menu-bar">
        <div className="nav-menu">
          <button
            type="button"
            onClick={() => setActiveTab("beranda")}
            className={`nav-btn ${activeTab === "beranda" ? "active" : ""}`}
          >
            Beranda
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pertinjau")}
            className={`nav-btn ${activeTab === "pertinjau" ? "active" : ""}`}
          >
            Pertinjau Surat
          </button>

          <button
            type="button"
            onClick={onUnduhPdf}
            disabled={isDownloading}
            className="nav-pdf-btn"
            title="Unduh surat PDF langsung di browser tanpa database"
          >
            {isDownloading ? "Mengunduh..." : "Unduh Surat PDF"}
          </button>
        </div>
      </nav>
    </header>
  );
}