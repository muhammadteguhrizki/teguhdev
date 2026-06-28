// dashboard/components/InvoiceForm.tsx
import { useState } from "react";
import InvoicePreview from "./InvoicePreview";
import "./InvoiceForm.css";

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

export default function InvoiceForm() {
  const [showPreview, setShowPreview] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-TD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    items: [{ id: 1, description: "", detail: "", qty: 1, price: 0 }],
    notes:
      "Terima kasih telah mempercayakan kebutuhan digital Anda kepada Teguh Dev. Pembayaran dapat dilakukan sebelum tanggal jatuh tempo.",
    bankName: "Bank BCA",
    accountNumber: "0801066207",
    accountName: "Muhammad Teguh Rizkiono",
    discount: 0,
    tax: 0,
    status: "status_invoice",
  });

  const addItem = () => {
    const newId =
      invoiceData.items.length > 0
        ? Math.max(...invoiceData.items.map((i) => i.id)) + 1
        : 1;
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { id: newId, description: "", detail: "", qty: 1, price: 0 },
      ],
    });
  };

  const removeItem = (id: number) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData({
        ...invoiceData,
        items: invoiceData.items.filter((item) => item.id !== id),
      });
    }
  };

  const updateItem = (
    id: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    });
  };

  const calculateTotal = () => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0,
    );
    const discountAmount = (subtotal * invoiceData.discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * invoiceData.tax) / 100;
    return {
      subtotal,
      discountAmount,
      taxAmount,
      total: subtotal - discountAmount + taxAmount,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleBack = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return (
      <div className="invoice-preview-wrapper">
        <div className="preview-actions">
          <button onClick={handleBack} className="btn-back">
            ← Kembali ke Form
          </button>
        </div>
        <InvoicePreview data={invoiceData} />
      </div>
    );
  }

  return (
    <div className="invoice-form-container">
      <h2 className="form-title">Buat Invoice</h2>

      <form onSubmit={handleSubmit} className="invoice-form">
        {/* Header Invoice */}
        <div className="form-section">
          <h3>Informasi Invoice</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nomor Invoice</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    invoiceNumber: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Tanggal Invoice</label>
              <input
                type="date"
                value={invoiceData.date}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>
                Jatuh Tempo{" "}
                <span
                  style={{
                    color: "#999",
                    fontSize: "11px",
                    fontWeight: "normal",
                  }}
                >
                  (Opsional)
                </span>
              </label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, dueDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="form-section">
          <h3>Informasi Klien</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nama Klien / Perusahaan</label>
              <input
                type="text"
                placeholder="Nama klien"
                value={invoiceData.clientName}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, clientName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="client@email.com"
                value={invoiceData.clientEmail}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    clientEmail: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Nomor Telepon</label>
              <input
                type="text"
                placeholder="+62 812-3456-7890"
                value={invoiceData.clientPhone}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    clientPhone: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Alamat</label>
              <input
                type="text"
                placeholder="Alamat klien"
                value={invoiceData.clientAddress}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    clientAddress: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="form-section">
          <h3>Item / Layanan</h3>
          {invoiceData.items.map((item, _) => (
            <div key={item.id} className="item-row">
              <div className="item-fields">
                <div className="form-group">
                  <label>Deskripsi</label>
                  <input
                    type="text"
                    placeholder="Nama layanan"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Detail</label>
                  <input
                    type="text"
                    placeholder="Detail layanan"
                    value={item.detail}
                    onChange={(e) =>
                      updateItem(item.id, "detail", e.target.value)
                    }
                  />
                </div>
                <div className="form-group form-group-small">
                  <label>Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      updateItem(item.id, "qty", parseInt(e.target.value) || 0)
                    }
                    required
                  />
                </div>
                <div className="form-group form-group-small">
                  <label>Harga</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "price",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn-remove-item"
                onClick={() => removeItem(item.id)}
                disabled={invoiceData.items.length <= 1}
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" className="btn-add-item" onClick={addItem}>
            + Tambah Item
          </button>
        </div>

        {/* Payment Info */}
        <div className="form-section">
          <h3>Informasi Pembayaran</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Bank</label>
              <input
                type="text"
                value={invoiceData.bankName}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, bankName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Nomor Rekening</label>
              <input
                type="text"
                value={invoiceData.accountNumber}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    accountNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Atas Nama</label>
              <input
                type="text"
                value={invoiceData.accountName}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    accountName: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Notes & Summary */}
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Catatan</label>
              <textarea
                rows={4}
                value={invoiceData.notes}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, notes: e.target.value })
                }
              />
            </div>
            <div className="form-group form-group-summary">
              <label>Diskon (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={invoiceData.discount}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    discount: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <label>Pajak (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={invoiceData.tax}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    tax: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <div className="form-summary">
                <p>
                  Subtotal: Rp{" "}
                  {calculateTotal().subtotal.toLocaleString("id-ID")}
                </p>
                <p>
                  Diskon: Rp{" "}
                  {calculateTotal().discountAmount.toLocaleString("id-ID")}
                </p>
                <p>
                  Pajak: Rp {calculateTotal().taxAmount.toLocaleString("id-ID")}
                </p>
                <p className="total-summary">
                  Total: Rp {calculateTotal().total.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Status Invoice</h3>
          <div className="form-row" style={{ gridTemplateColumns: "1fr" }}>
            <div className="form-group">
              <label>Pilih Status</label>
              <select
                value={invoiceData.status}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, status: e.target.value })
                }
                className="form-select"
                style={{
                  padding: "10px 14px",
                  border: "1px solid var(--border, #e5e9f0)",
                  borderRadius: "8px",
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "14px",
                  background: "#fafbfc",
                  transition: "border-color 0.2s",
                  cursor: "pointer",
                }}
              >
                <option value="status_invoice">Belum Bayar</option>
                <option value="lunas">Lunas</option>
                <option value="penawaran">Penawaran</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Preview Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
