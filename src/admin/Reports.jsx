import React, { useState } from "react";

export default function Reports() {
  const [filter, setFilter] = useState("monthly");

  return (
    <div>
      <h4 className="mb-3">📈 Laporan Booking</h4>

      <div className="mb-3">
        <select
          className="form-select bg-dark text-light border-secondary w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="daily">Harian</option>
          <option value="weekly">Mingguan</option>
          <option value="monthly">Bulanan</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle">
          <thead style={{ background: "#2a2a2a" }}>
            <tr>
              <th>Tanggal</th>
              <th>Jumlah Booking</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-09-01</td>
              <td>15</td>
              <td>Rp 1.500.000</td>
            </tr>
            <tr>
              <td>2025-09-02</td>
              <td>22</td>
              <td>Rp 2.200.000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
