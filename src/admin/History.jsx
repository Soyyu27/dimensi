import React from "react";

export default function History() {
  const bookings = [
    { id: 1, name: "Andi", date: "2025-09-25", time: "10:00", status: "Confirmed" },
    { id: 2, name: "Budi", date: "2025-09-25", time: "11:00", status: "Pending" },
    { id: 3, name: "Rizky", date: "2025-09-24", time: "09:00", status: "Canceled" },
  ];

  return (
    <div>
      <h4 className="mb-3">📖 History Booking</h4>
      <div className="table-responsive">
        <table
          className="table table-dark table-hover align-middle"
          style={{ background: "#1e1e1e" }}
        >
          <thead style={{ background: "#2a2a2a" }}>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>
                  <span
                    className={`badge ${
                      b.status === "Confirmed"
                        ? "bg-success"
                        : b.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
