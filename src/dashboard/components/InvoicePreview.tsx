// dashboard/components/InvoicePreview.tsx
import { useRef } from "react";
import html2canvas from "html2canvas";
import "./InvoicePreview.css";
import { getImagePath } from "../../utils/path";

interface InvoiceItem {
  id: number;
  description: string;
  detail: string;
  qty: number;
  price: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  items: InvoiceItem[];
  notes: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  discount: number;
  tax: number;
  status: string;
}

interface InvoicePreviewProps {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: string) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusInfo = () => {
    switch (data.status) {
      case "lunas":
        return { label: "LUNAS", className: "status-paid" };
      case "penawaran":
        return { label: "PENAWARAN", className: "status-quotation" };
      default:
        return { label: "BELUM DIBAYAR", className: "status-unpaid" };
    }
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const calculateTotal = () => {
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0,
    );
    const discountAmount = (subtotal * data.discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * data.tax) / 100;
    return {
      subtotal,
      discountAmount,
      taxAmount,
      total: subtotal - discountAmount + taxAmount,
    };
  };

  const totals = calculateTotal();
  const statusInfo = getStatusInfo();

  const handleDownloadPNG = async () => {
    if (!invoiceRef.current) return;

    // Tampilkan loading
    const loadingToast = document.createElement("div");
    loadingToast.id = "loading-toast";
    loadingToast.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.85);
      color: white;
      padding: 24px 48px;
      border-radius: 16px;
      font-size: 18px;
      z-index: 9999;
      font-family: 'Poppins', sans-serif;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 16px;
    `;
    loadingToast.innerHTML = `
      <span style="display:inline-block;width:24px;height:24px;border:3px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.8s linear infinite;"></span>
      Menyiapkan gambar...
    `;
    document.body.appendChild(loadingToast);

    // Tambahkan keyframe animasi
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    try {
      // Tunggu sebentar agar konten siap
      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        width: invoiceRef.current.scrollWidth,
        height: invoiceRef.current.scrollHeight,
        windowWidth: invoiceRef.current.scrollWidth,
        windowHeight: invoiceRef.current.scrollHeight,
      });

      // Hapus loading
      document.body.removeChild(loadingToast);
      document.head.removeChild(style);

      // Download PNG
      const link = document.createElement("a");
      link.download = `Invoice-${data.invoiceNumber || "TD"}.png`;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PNG:", error);
      if (document.getElementById("loading-toast")) {
        document.body.removeChild(loadingToast);
      }
      alert("Gagal menghasilkan gambar. Silakan coba lagi.");
    }
  };

  return (
    <section className="invoice-preview">
      <div ref={invoiceRef} className="invoice">
        {/* HEADER */}
        <header className="invoice-header">
          <div className="brand">
            <img
              src={getImagePath("/img/teguhdev_color.png")}
              alt="Teguh Dev"
              className="brand-logo"
            />
          </div>

          <div className="invoice-title">
            <h2>INVOICE</h2>
            <span className="invoice-number">{data.invoiceNumber}</span>
          </div>
        </header>

        <div className="gold-line"></div>

        {/* INFO INVOICE */}
        <section className="invoice-info">
          <div className="bill-to">
            <p className="label">DITUJUKAN KEPADA</p>
            <h3>{data.clientName || "Nama Klien"}</h3>
            <p>{data.clientEmail || "client@email.com"}</p>
            <p>{data.clientPhone || "+62 812-3456-7890"}</p>
            <p>{data.clientAddress || "Alamat klien"}</p>
          </div>

          <div className="invoice-meta">
            <div>
              <span>Tanggal Invoice</span>
              <strong>{formatDate(data.date)}</strong>
            </div>
            {data.dueDate && (
              <div>
                <span>Jatuh Tempo</span>
                <strong>{formatDate(data.dueDate)}</strong>
              </div>
            )}
            <div>
              <span>Status</span>
              <strong className={statusInfo.className}>
                {statusInfo.label}
              </strong>
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="table-responsive">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Deskripsi Layanan</th>
                <th className="center">Qty</th>
                <th className="right">Harga</th>
                <th className="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.description || `Item ${index + 1}`}</strong>
                    <small>{item.detail || "-"}</small>
                  </td>
                  <td className="center">{item.qty || 0}</td>
                  <td className="right">{formatCurrency(item.price || 0)}</td>
                  <td className="right">
                    {formatCurrency((item.qty || 0) * (item.price || 0))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* TOTAL */}
        <section className="invoice-bottom">
          <div className="notes">
            <p className="label">CATATAN</p>
            <p>
              {data.notes ||
                "Terima kasih telah mempercayakan kebutuhan digital Anda kepada Teguh Dev."}
            </p>

            <div className="payment-info">
              <strong>Informasi Pembayaran</strong>
              <p>
                {data.bankName || "Bank BCA"} -{" "}
                {data.accountNumber || "1234567890"}
              </p>
              <p>a.n. {data.accountName || "Muhammad Teguh Rizkiono"}</p>
            </div>
          </div>

          <div className="invoice-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatCurrency(totals.subtotal)}</strong>
            </div>

            {data.discount > 0 && (
              <div className="summary-row">
                <span>Diskon ({data.discount}%)</span>
                <strong>- {formatCurrency(totals.discountAmount)}</strong>
              </div>
            )}

            {data.tax > 0 && (
              <div className="summary-row">
                <span>Pajak ({data.tax}%)</span>
                <strong>{formatCurrency(totals.taxAmount)}</strong>
              </div>
            )}

            <div className="total-box">
              <span>TOTAL</span>
              <strong>{formatCurrency(totals.total)}</strong>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="invoice-footer">
          <p>Teguh Dev — Digital Solutions & Software Development</p>
          <p>Email: programmergabut@gmail.com</p>
        </footer>
      </div>

      <div
        className="button-area"
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => window.print()} className="print-btn">
          <i className="fa-solid fa-print"></i> Cetak PDF
        </button>

        <button
          onClick={handleDownloadPNG}
          className="print-btn"
          style={{ background: "#2563eb" }}
        >
          <i className="fa-solid fa-image"></i> Download PNG
        </button>
      </div>
    </section>
  );
}
