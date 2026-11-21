import html2pdf from "html2pdf.js";

export const formatRupiah = (angka) => {
  const num = Number(angka) || 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatTanggalIndo = (dateStr) => {
  if (!dateStr) return "-";
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const unduhSuratPdf = async (element, nomorPenawaran) => {
  if (!element) return;
  const namaFile = `Penawaran_${(nomorPenawaran || "Surat")
    .replace(/[^a-zA-Z0-9-_]/g, "_")}.pdf`;

  const opt = {
    margin: [10, 10, 10, 10],
    filename: namaFile,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  await html2pdf().set(opt).from(element).save();
};