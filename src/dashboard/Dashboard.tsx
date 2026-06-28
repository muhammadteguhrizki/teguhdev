// dashboard/Dashboard.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import InvoiceForm from "./components/InvoiceForm";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"dashboard" | "invoice">(
    "dashboard",
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Selamat datang Admin TeguhDev</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="dashboard-logout-btn"
          >
            Logout
          </button>
        </header>

        {/* Tab Navigation */}
        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === "invoice" ? "active" : ""}`}
            onClick={() => setActiveTab("invoice")}
          >
            Buat Invoice
          </button>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === "dashboard" ? (
            <div className="dashboard-info">
              <h3 className="info-title">Informasi Pengguna</h3>
              <div className="info-item">
                <span className="info-label">Nama</span>
                <span className="info-value">Admin</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">
                  muhammadteguhrizkiono@gmail.com
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value info-status-active">Aktif</span>
              </div>
            </div>
          ) : (
            <InvoiceForm />
          )}
        </div>
      </div>
    </div>
  );
}
