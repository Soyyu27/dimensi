import React, { useState } from "react";
import { useBookings } from "../context/BookingContext";

export default function Settings() {
  const {
    bookingOpen,
    openHour,
    closeHour,
    adminMessage,
    updateSettings
  } = useBookings();

  const [message, setMessage] = useState(adminMessage);
  const [open, setOpen] = useState(bookingOpen);
  const [openH, setOpenH] = useState(openHour);
  const [closeH, setCloseH] = useState(closeHour);

  const saveSettings = () => {
    updateSettings({
      bookingOpen: open,
      openHour: openH,
      closeHour: closeH,
      adminMessage: message
    });
    alert("Settings berhasil disimpan!");
  };

  return (
    <div>
      <h4 className="mb-3">⚙️ Pengaturan Booking</h4>

      {/* Toggle Booking */}
      <div className="card shadow-sm border-0 p-3 mb-4" style={{ background: "#1e1e1e" }}>
        <p>Status Booking: <span className={`badge ${open ? "bg-success" : "bg-danger"}`}>{open ? "Aktif" : "Tutup"}</span></p>
        <button className="btn btn-outline-light" onClick={() => setOpen(!open)}>
          {open ? "🔒 Tutup Booking" : "🔓 Buka Booking"}
        </button>
      </div>

      {/* Jam Operasional */}
      <div className="card shadow-sm border-0 p-3 mb-4" style={{ background: "#1e1e1e" }}>
        <h6>Jam Operasional</h6>
        <div className="d-flex gap-2 align-items-center">
          <label>Buka:</label>
          <input
            type="number"
            min="0"
            max="23"
            className="form-control bg-dark text-light border-secondary"
            value={openH}
            onChange={(e) => setOpenH(Number(e.target.value))}
            style={{ maxWidth: "80px" }}
          />
          <label>Tutup:</label>
          <input
            type="number"
            min="0"
            max="23"
            className="form-control bg-dark text-light border-secondary"
            value={closeH}
            onChange={(e) => setCloseH(Number(e.target.value))}
            style={{ maxWidth: "80px" }}
          />
        </div>
      </div>

      {/* Pesan Admin */}
      <div className="card shadow-sm border-0 p-3 mb-4" style={{ background: "#1e1e1e" }}>
        <h6>Pesan Admin</h6>
        <textarea
          className="form-control bg-dark text-light border-secondary"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Contoh: Booking diundur ke jam 10.00 karena kendala..."
        />
      </div>

      <button className="btn btn-success" onClick={saveSettings}>
        Simpan Settings
      </button>
    </div>
  );
}
