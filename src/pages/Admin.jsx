import React, { useState } from "react";
import Dashboard from "../admin/Dashboard";
import History from "../admin/History";
import Reports from "../admin/Reports";
import Settings from "../admin/Settings";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div
      className="container-fluid py-4"
      style={{ minHeight: "100vh", background: "#121212", color: "#f1f1f1" }}
    >
      <h2 className="mb-4 text-center fw-bold" style={{ color: "#00d8ff" }}>
        Dimensi Admin Panel
      </h2>

      {/* Navigasi */}
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        {["dashboard", "history", "reports", "settings"].map((tab) => (
          <button
            key={tab}
            className={`btn ${
              activeTab === tab ? "btn-light" : "btn-outline-light"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Konten */}
      <div
        className="card shadow-lg border-0 p-4"
        style={{ background: "#1e1e1e", color: "#f1f1f1" }}
      >
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "history" && <History />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
}
