import React, { useState } from "react";
import { useBookings } from "../context/BookingContext";

export default function Settings() {
  const { bookingOpen, toggleBookingOpen, setAdminMessage } = useBookings();
  const [message, setMessage] = useState("");

  return (
    <div>
      <h4 className="mb-3">⚙️ Pengaturan Booking</h4>

      <div className="card shadow-sm border-0 p-3 mb-4" style={{ background: "#1e1e1e" }}>
        <p>
          Status Booking:{" "}
          <span className={`badge ${bookingOpen ? "bg-success" : "bg-danger"}`}>
            {bookingOpen ? "Aktif" : "Tutup"}
          </span>
        </p>
        <button className="btn btn-outline-light" onClick={toggleBookingOpen}>
          {bookingOpen ? "🔒 Tutup Booking" : "🔓 Buka Booking"}
        </button>
      </div>

      <div className="card shadow-sm border-0 p-3" style={{ background: "#1e1e1e" }}>
        <h6>Kirim Pesan Admin</h6>
        <textarea
          className="form-control bg-dark text-light border-secondary mb-2"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Contoh: Booking diundur ke jam 10.00 karena kendala..."
        />
        <button
          className="btn btn-success"
          onClick={() => {
            setAdminMessage(message);
            setMessage("");
          }}
        >
          Kirim Pesan
        </button>
      </div>
    </div>
  );
}
