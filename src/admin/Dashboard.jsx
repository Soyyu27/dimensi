import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8080/api/bookings";

  // Ambil data dari backend
  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_URL);
      // Urutkan data sesuai tanggal & waktu
      const sorted = res.data.sort((a, b) => {
        const dateA = new Date(`${a.bookingDate}T${a.bookingTime}`);
        const dateB = new Date(`${b.bookingDate}T${b.bookingTime}`);
        return dateA - dateB;
      });
      setBookings(sorted);
    } catch (err) {
      console.error("Gagal ambil data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update status booking
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchBookings(); // refresh tabel
    } catch (err) {
      console.error("Gagal update status", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h4 className="mb-3">📊 Ringkasan Booking</h4>

      {/* Statistik */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3">
            <h5>Total</h5>
            <h2 style={{ color: "#00d8ff" }}>{bookings.length}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3">
            <h5>Confirmed</h5>
            <h2 style={{ color: "#00d8ff" }}>
              {bookings.filter((b) => b.status === "Confirmed").length}
            </h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3">
            <h5>Pending</h5>
            <h2 style={{ color: "#00d8ff" }}>
              {bookings.filter((b) => b.status === "Pending").length}
            </h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3">
            <h5>Completed</h5>
            <h2 style={{ color: "#00d8ff" }}>
              {bookings.filter((b) => b.status === "Completed").length}
            </h2>
          </div>
        </div>
      </div>

      {/* Tabel Booking */}
      <h5>📑 Daftar Booking</h5>
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>HP</th>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
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
                      b.status === "Confirmed"
                        ? "bg-success"
                        : b.status === "Pending"
                        ? "bg-warning text-dark"
                        : b.status === "Completed"
                        ? "bg-primary"
                        : "bg-danger"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  {b.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => updateStatus(b.id, "Confirmed")}
                      >
                        Terima
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => updateStatus(b.id, "Rejected")}
                      >
                        Tolak
                      </button>
                    </>
                  )}

                  {b.status === "Confirmed" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => updateStatus(b.id, "Completed")}
                    >
                      Selesai
                    </button>
                  )}

                  {b.status === "Rejected" && <span>❌ Ditolak</span>}
                  {b.status === "Completed" && <span>✅ Selesai</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
