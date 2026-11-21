import React from "react";
import { formatRupiah, formatTanggalIndo } from "../utils/formatSurat";
import { getLogoPerusahaan } from "../utils/logoDefault";

export default function PertinjauSurat({
  suratRef,
  companyData,
  logoSrc,
  info,
  items,
  perhitungan,
  totals,
  onBackBeranda,
  onUnduhPdf,
  isDownloading,
  isHiddenMode = false,
}) {
  const { subtotal, nominalDiskon, nominalPpn, totalAkhir } = totals;
  const activeLogo = getLogoPerusahaan(logoSrc);

  return (
    <div className={isHiddenMode ? "pdf-hidden-container" : "preview-outer"}>
      {!isHiddenMode && (
        <div className="preview-toolbar">
          <button
            type="button"
            onClick={onBackBeranda}
            className="btn-outline-navy"
          >
            &larr; Kembali ke Beranda
          </button>
          <button
            type="button"
            onClick={onUnduhPdf}
            disabled={isDownloading}
            className="btn-navy"
          >
            {isDownloading ? "Mengunduh PDF..." : "Unduh Surat PDF"}
          </button>
        </div>
      )}

      <div className="sheet-scroll-wrapper">
        <div ref={suratRef} className="letter-sheet">
          {/* KOP SURAT: Logo Default Kiri Atas | Company.json Kanan Atas */}
          <div className="kop-header">
            <div className="kop-left">
              <img
                src={activeLogo}
                alt="Logo Perusahaan"
                className="logo-img"
              />
            </div>

            <div className="kop-right">
              <div className="company-name">
                {(companyData.toko || "ALL JARING SAFETY").toUpperCase()}
              </div>
              <div className="company-detail">{companyData.alamat}</div>
              <div className="company-detail">
                Telp/WA: {companyData.no_telepon}
              </div>
              <div className="company-detail">
                Website: {companyData.WebCompany}
              </div>
            </div>
          </div>

          {/* GARIS SETELAH COMPANY */}
          <hr className="kop-divider" />

          {/* JUDUL SURAT */}
          <div className="doc-title-block">
            <h1 className="doc-title">SURAT PENAWARAN BARANG</h1>
            <div className="doc-number">
              Nomor: {info.nomorPenawaran || "____/__________/____/____"}
            </div>
          </div>

          {/* A. INFORMASI PENAWARAN */}
          <div className="letter-section">
            <table className="meta-table">
              <tbody>
                <tr>
                  <td className="meta-label">Tanggal Penawaran</td>
                  <td className="meta-colon">:</td>
                  <td className="meta-value">
                    {formatTanggalIndo(info.tanggalPenawaran)}
                  </td>
                </tr>
                <tr>
                  <td className="meta-label">Berlaku Hingga</td>
                  <td className="meta-colon">:</td>
                  <td className="meta-value">
                    {formatTanggalIndo(info.berlakuHingga)}
                  </td>
                </tr>
                <tr>
                  <td className="meta-label">Ditujukan Kepada</td>
                  <td className="meta-colon">:</td>
                  <td className="meta-value">{info.ditujukanKepada || "-"}</td>
                </tr>
                <tr>
                  <td className="meta-label">Alamat Penerima</td>
                  <td className="meta-colon">:</td>
                  <td className="meta-value">{info.alamatPenerima || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* B. RINCIAN */}
          <div className="letter-section">
            <div className="letter-subheading">Rincian Barang:</div>
            <table className="items-table">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>No</th>
                  <th style={{ width: "22%" }}>Nama Barang</th>
                  <th style={{ width: "25%" }}>Quality / Spesifikasi</th>
                  <th style={{ width: "10%" }}>Satuan</th>
                  <th style={{ width: "10%" }}>Jumlah</th>
                  <th style={{ width: "14%" }}>Harga Satuan</th>
                  <th style={{ width: "14%" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const rowTotal =
                    (Number(item.jumlah) || 0) * (Number(item.hargaSatuan) || 0);
                  return (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{item.namaBarang || "-"}</td>
                      <td>{item.qualitySpesifikasi || "-"}</td>
                      <td className="text-center">{item.satuan || "-"}</td>
                      <td className="text-right">{item.jumlah || 0}</td>
                      <td className="text-right">
                        {formatRupiah(item.hargaSatuan)}
                      </td>
                      <td className="text-right">{formatRupiah(rowTotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* C. PERHITUNGAN CATATAN */}
          <div className="letter-section">
            <div className="calc-wrapper">
              <table className="calc-table">
                <tbody>
                  <tr>
                    <td className="calc-label">Subtotal</td>
                    <td className="calc-val">{formatRupiah(subtotal)}</td>
                  </tr>
                  <tr>
                    <td className="calc-label">
                      Diskon ({perhitungan.diskonPersen || 0}%)
                    </td>
                    <td className="calc-val">
                      - {formatRupiah(nominalDiskon)}
                    </td>
                  </tr>
                  <tr>
                    <td className="calc-label">
                      PPN ({perhitungan.ppnPersen || 0}%)
                    </td>
                    <td className="calc-val">+ {formatRupiah(nominalPpn)}</td>
                  </tr>
                  <tr>
                    <td className="calc-label">Biaya Tambahan</td>
                    <td className="calc-val">
                      + {formatRupiah(perhitungan.biayaTambahan)}
                    </td>
                  </tr>
                  <tr className="calc-grand-row">
                    <td className="calc-grand-label">TOTAL PENAWARAN</td>
                    <td className="calc-grand-val">
                      {formatRupiah(totalAkhir)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="notes-block">
              <div className="letter-subheading">Catatan Penawaran:</div>
              <p className="notes-text">
                {perhitungan.catatanPenawaran?.trim()
                  ? perhitungan.catatanPenawaran
                  : "Harga bersifat penawaran resmi sesuai masa berlaku di atas."}
              </p>
            </div>

            <div className="sign-block">
              <div className="sign-box">
                <div>Hormat kami,</div>
                <div className="sign-company">
                  {companyData.toko || "ALL JARING SAFETY"}
                </div>
                <div className="sign-space" />
                <div className="sign-name">
                  ( {perhitungan.namaPenanggungJawab || "_____________________"}{" "}
                  )
                </div>
                <div className="sign-role">Penanggung Jawab</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}