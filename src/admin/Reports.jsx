import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [filter, setFilter] = useState("monthly");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("100000"); // Harga default
  const [priceList, setPriceList] = useState([]);

  // Ambil data dari backend
  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/bookings/history", {
        params: { range: filter },
      });

      // Hitung jumlah per tanggal
      const grouped = res.data.reduce((acc, b) => {
        const date = b.bookingDate;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      // Hitung total berdasarkan harga
      const result = Object.entries(grouped).map(([date, count]) => {
        const total = priceList.length > 0
          ? priceList.slice(0, count).reduce((a, b) => a + b, 0)
          : count * Number(price);
        return { date, count, total };
      });

      setReports(result);
    } catch (err) {
      console.error("Gagal ambil laporan", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filter, priceList, price]);

  const savePriceList = () => {
    // Bisa input banyak harga sekaligus dengan "-" atau ","
    const arr = price.split(/[-,]/).map((p) => Number(p.trim()));
    setPriceList(arr);
  };

  if (loading) return <p>Loading laporan...</p>;

  return (
    <div>
      <h4 className="mb-3">📈 Laporan Booking</h4>

      <div className="d-flex flex-wrap gap-3 mb-3 align-items-center">
        <select
          className="form-select bg-dark text-light border-secondary w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="daily">Harian</option>
          <option value="weekly">Mingguan</option>
          <option value="monthly">Bulanan</option>
        </select>

        <div className="input-group w-auto">
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Masukkan harga (pisahkan - atau ,)"
          />
          <button className="btn btn-primary" onClick={savePriceList}>
            Simpan Harga
          </button>
        </div>
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
            {reports.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              reports.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.date}</td>
                  <td>{r.count}</td>
                  <td>Rp {r.total.toLocaleString("id-ID")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
