import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function History() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("daily");

  const API_URL = "http://localhost:8080/api/bookings/history";

  // Fetch history dari backend
  const fetchHistory = async (selectedRange) => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, {
        params: { range: selectedRange },
      });

      // urutkan sesuai tanggal + waktu (ascending)
      const sorted = res.data.sort((a, b) => {
        const dateA = new Date(`${a.bookingDate}T${a.bookingTime}`);
        const dateB = new Date(`${b.bookingDate}T${b.bookingTime}`);
        return dateA - dateB;
      });

      setBookings(sorted);
    } catch (err) {
      console.error("Gagal ambil history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(range);
  }, [range]);

  // Export ke Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(bookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "History");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `history-${range}.xlsx`);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-3">📜 History Booking</h4>

      {/* Filter range */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <select
          className="form-select w-auto"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="daily">Hari ini</option>
          <option value="weekly">7 Hari Terakhir</option>
          <option value="monthly">30 Hari Terakhir</option>
        </select>

        <button className="btn btn-success" onClick={exportToExcel}>
          📥 Export Excel
        </button>
      </div>

      {/* Tabel History */}
      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>HP</th>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Tidak ada history
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.customerName}</td>
                  <td>{b.customerEmail}</td>
                  <td>{b.customerPhone}</td>
                  <td>{b.bookingDate}</td>
                  <td>{b.bookingTime}</td>
                  <td>
                    <span
                      className={`badge ${
                        b.status === "Completed"
                          ? "bg-success"
                          : b.status === "Rejected"
                          ? "bg-danger"
                          : b.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
