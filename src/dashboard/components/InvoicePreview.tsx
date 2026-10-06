// dashboard/components/InvoicePreview.tsx
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
  dpAmount: number;
  status: string;
}

interface InvoicePreviewProps {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const captureInvoice = async (): Promise<HTMLCanvasElement> => {
    if (!invoiceRef.current) {
      throw new Error("Invoice tidak ditemukan.");
    }

    await document.fonts.ready;

    const images = Array.from(invoiceRef.current.querySelectorAll("img"));

    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), {
            once: true,
          });

          img.addEventListener("error", () => resolve(), {
            once: true,
          });
        });
      }),
    );

    return html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: 1200,

      onclone: (clonedDocument) => {
        const style = clonedDocument.createElement("style");

        style.textContent = `
          .invoice-preview .invoice {
            width: 900px !important;
            min-width: 900px !important;
            max-width: none !important;
            box-sizing: border-box !important;
            padding: 45px 50px 30px !important;
          }

          .invoice-preview .invoice-header {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
          }

          .invoice-preview .invoice-info {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
          }

          .invoice-preview .invoice-bottom {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
          }

          .invoice-preview .invoice-footer {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
          }

          .invoice-preview .invoice-title {
            text-align: right !important;
          }

          .invoice-preview .invoice-title h2 {
            font-size: 34px !important;
          }

          .invoice-preview .brand-logo {
            width: 175px !important;
            height: 105px !important;
          }

          .invoice-preview .invoice-meta {
            min-width: 280px !important;
            width: auto !important;
          }

          .invoice-preview .notes {
            width: 53% !important;
          }

          .invoice-preview .invoice-summary {
            width: 300px !important;
            min-width: 300px !important;
          }

          .invoice-preview .table-responsive {
            overflow: visible !important;
          }
        `;

        clonedDocument.head.appendChild(style);
      },
    });
  };

  const handleDownloadPNG = async () => {
    try {
      const canvas = await captureInvoice();

      const link = document.createElement("a");

      link.download = `Invoice-${data.invoiceNumber || "TD"}.png`;
      link.href = canvas.toDataURL("image/png");

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("Gagal membuat gambar invoice.");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const canvas = await captureInvoice();

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;

      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const imageHeight = (canvas.height * availableWidth) / canvas.width;

      if (imageHeight <= availableHeight) {
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          availableWidth,
          imageHeight,
        );
      } else {
        const pageCanvas = document.createElement("canvas");
        const pageContext = pageCanvas.getContext("2d");

        if (!pageContext) {
          throw new Error("Gagal membuat halaman PDF.");
        }

        const pixelsPerMm = canvas.width / availableWidth;

        const pageHeightPx = Math.floor(availableHeight * pixelsPerMm);

        pageCanvas.width = canvas.width;

        let offset = 0;
        let pageNumber = 0;

        while (offset < canvas.height) {
          const sliceHeight = Math.min(pageHeightPx, canvas.height - offset);

          pageCanvas.height = sliceHeight;

          pageContext.clearRect(0, 0, pageCanvas.width, pageCanvas.height);

          pageContext.drawImage(
            canvas,
            0,
            offset,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight,
          );

          if (pageNumber > 0) {
            pdf.addPage();
          }

          pdf.addImage(
            pageCanvas.toDataURL("image/png"),
            "PNG",
            margin,
            margin,
            availableWidth,
            sliceHeight / pixelsPerMm,
          );

          offset += sliceHeight;
          pageNumber++;
        }
      }

      pdf.save(`Invoice-${data.invoiceNumber || "TD"}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Gagal membuat PDF invoice.");
    }
  };

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
      case "dp":
        return { label: "SUDAH DP", className: "status-dp" };
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

  const dpAmount =
    data.status === "dp" ? Math.min(data.dpAmount || 0, totals.total) : 0;

  const remainingAmount =
    data.status === "dp" ? Math.max(totals.total - dpAmount, 0) : totals.total;

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
            <p>{data.clientPhone || "+62 878-2540-0060"}</p>
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
            <p>{data.notes}</p>

            {data.status !== "penawaran" && (
              <div className="payment-info">
                <strong>Informasi Pembayaran</strong>

                <p>
                  {data.bankName} - {data.accountNumber}
                </p>

                <p>a.n. {data.accountName}</p>
              </div>
            )}
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

            {data.status === "dp" && (
              <>
                <div className="summary-row">
                  <span>Sudah Dibayar (DP)</span>
                  <strong>- {formatCurrency(dpAmount)}</strong>
                </div>

                <div className="total-box">
                  <span>SISA PEMBAYARAN</span>
                  <strong>{formatCurrency(remainingAmount)}</strong>
                </div>
              </>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="invoice-footer">
          <p>
            <strong>TeguhDev</strong> — Digital Solutions & Software Development
          </p>
          <p>
            Jl. Taruna Pojoksari, Kendal, Indonesia, 51354 ·
            programmergabut@gmail.com
          </p>
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
        <button type="button" onClick={handleDownloadPDF} className="print-btn">
          <i className="fa-solid fa-file-pdf"></i> Cetak PDF
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
