import React from "react";
import { formatRupiah } from "../utils/formatSurat";

export default function FormPenawaran({
  logoSrc,
  onLogoUpload,
  onRemoveLogo,
  info,
  setInfo,
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
  perhitungan,
  setPerhitungan,
  totals,
  onGoPreview,
  onUnduhPdf,
  isDownloading,
}) {
  const { subtotal, nominalDiskon, nominalPpn, totalAkhir } = totals;

  return (
    <div className="form-card">
      <div className="form-header">
        <h1 className="form-title">FORMULIR SURAT PENAWARAN BARANG</h1>
        <p className="form-subtitle">
          Lengkapi data A, B, dan C di bawah ini, lalu buka{" "}
          <strong>Pertinjau Surat</strong> atau <strong>Unduh Surat PDF</strong>.
        </p>
      </div>

      {/* A. INFORMASI PENAWARAN */}
      <section className="section-box">
        <h2 className="section-title">A. Informasi Penawaran</h2>
        <div className="grid-2">
          <div className="field-group">
            <label className="field-label">1. Nomor Penawaran</label>
            <input
              type="text"
              placeholder="Contoh: 001/AJS/SPH/XI/2026"
              value={info.nomorPenawaran}
              onChange={(e) =>
                setInfo({ ...info, nomorPenawaran: e.target.value })
              }
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label className="field-label">2. Tanggal Penawaran</label>
            <input
              type="date"
              value={info.tanggalPenawaran}
              onChange={(e) =>
                setInfo({ ...info, tanggalPenawaran: e.target.value })
              }
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label className="field-label">3. Berlaku Hingga</label>
            <input
              type="date"
              value={info.berlakuHingga}
              onChange={(e) =>
                setInfo({ ...info, berlakuHingga: e.target.value })
              }
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label className="field-label">4. Ditujukan Kepada</label>
            <input
              type="text"
              placeholder="Nama Perusahaan / Instansi / Penerima"
              value={info.ditujukanKepada}
              onChange={(e) =>
                setInfo({ ...info, ditujukanKepada: e.target.value })
              }
              className="field-input"
            />
          </div>
        </div>

        <div className="field-group mt-12">
          <label className="field-label">5. Alamat Penerima</label>
          <textarea
            rows={2}
            placeholder="Alamat lengkap penerima..."
            value={info.alamatPenerima}
            onChange={(e) =>
              setInfo({ ...info, alamatPenerima: e.target.value })
            }
            className="field-textarea"
          />
        </div>
      </section>

      {/* B. RINCIAN */}
      <section className="section-box">
        <div className="section-header-row">
          <h2 className="section-title-inline">B. Rincian</h2>
          <button
            type="button"
            onClick={onAddItem}
            className="btn-navy-small"
          >
            + Tambah Barang
          </button>
        </div>

        {items.map((item, idx) => {
          const jumlahHarga =
            (Number(item.jumlah) || 0) * (Number(item.hargaSatuan) || 0);
          return (
            <div key={item.id} className="item-card">
              <div className="item-card-top">
                <strong className="item-number">Item #{idx + 1}</strong>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="btn-danger-small"
                  >
                    Hapus
                  </button>
                )}
              </div>

              <div className="grid-3">
                <div className="field-group">
                  <label className="field-label">1. Nama Barang</label>
                  <input
                    type="text"
                    placeholder="Nama barang"
                    value={item.namaBarang}
                    onChange={(e) =>
                      onItemChange(item.id, "namaBarang", e.target.value)
                    }
                    className="field-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">2. Quality / Spesifikasi</label>
                  <input
                    type="text"
                    placeholder="Spesifikasi / kualitas"
                    value={item.qualitySpesifikasi}
                    onChange={(e) =>
                      onItemChange(item.id, "qualitySpesifikasi", e.target.value)
                    }
                    className="field-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">3. Satuan</label>
                  <input
                    type="text"
                    placeholder="Roll / Unit / Pcs"
                    value={item.satuan}
                    onChange={(e) =>
                      onItemChange(item.id, "satuan", e.target.value)
                    }
                    className="field-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">4. Jumlah</label>
                  <input
                    type="number"
                    min="0"
                    value={item.jumlah}
                    onChange={(e) =>
                      onItemChange(item.id, "jumlah", e.target.value)
                    }
                    className="field-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">5. Harga Satuan (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    value={item.hargaSatuan}
                    onChange={(e) =>
                      onItemChange(item.id, "hargaSatuan", e.target.value)
                    }
                    className="field-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Jumlah Harga</label>
                  <div className="calculated-box">
                    {formatRupiah(jumlahHarga)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* C. PERHITUNGAN CATATAN */}
      <section className="section-box">
        <h2 className="section-title">C. Perhitungan Catatan</h2>
        <div className="grid-3">
          <div className="field-group">
            <label className="field-label">1. Diskon (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={perhitungan.diskonPersen}
              onChange={(e) =>
                setPerhitungan({ ...perhitungan, diskonPersen: e.target.value })
              }
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label className="field-label">2. PPN (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={perhitungan.ppnPersen}
              onChange={(e) =>
                setPerhitungan({ ...perhitungan, ppnPersen: e.target.value })
              }
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label className="field-label">3. Biaya Tambahan (Rp)</label>
            <input
              type="number"
              min="0"
              value={perhitungan.biayaTambahan}
              onChange={(e) =>
                setPerhitungan({ ...perhitungan, biayaTambahan: e.target.value })
              }
              className="field-input"
            />
          </div>
        </div>

        <div className="grid-2 mt-12">
          <div className="field-group">
            <label className="field-label">4. Catatan Penawaran</label>
            <textarea
              rows={3}
              placeholder="Catatan penawaran..."
              value={perhitungan.catatanPenawaran}
              onChange={(e) =>
                setPerhitungan({
                  ...perhitungan,
                  catatanPenawaran: e.target.value,
                })
              }
              className="field-textarea"
            />
          </div>

          <div className="field-group">
            <label className="field-label">5. Nama Penanggung Jawab</label>
            <input
              type="text"
              placeholder="Nama penanggung jawab"
              value={perhitungan.namaPenanggungJawab}
              onChange={(e) =>
                setPerhitungan({
                  ...perhitungan,
                  namaPenanggungJawab: e.target.value,
                })
              }
              className="field-input"
            />
          </div>
        </div>

        <div className="summary-box">
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatRupiah(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Diskon ({perhitungan.diskonPersen || 0}%)</span>
            <span>- {formatRupiah(nominalDiskon)}</span>
          </div>
          <div className="summary-row">
            <span>PPN ({perhitungan.ppnPersen || 0}%)</span>
            <span>+ {formatRupiah(nominalPpn)}</span>
          </div>
          <div className="summary-row">
            <span>Biaya Tambahan</span>
            <span>+ {formatRupiah(perhitungan.biayaTambahan)}</span>
          </div>
          <div className="summary-total-row">
            <span>Total Penawaran</span>
            <span>{formatRupiah(totalAkhir)}</span>
          </div>
        </div>
      </section>

      <div className="action-footer">
        <button type="button" onClick={onGoPreview} className="btn-navy">
          Pertinjau Surat
        </button>
        <button
          type="button"
          onClick={onUnduhPdf}
          disabled={isDownloading}
          className="btn-outline-navy"
        >
          {isDownloading ? "Mengunduh PDF..." : "Unduh Surat PDF"}
        </button>
      </div>
    </div>
  );
}