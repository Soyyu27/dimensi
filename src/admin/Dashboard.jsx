import React from "react";

export default function Dashboard() {
  const cardStyle = {
    background: "#1e1e1e",
    color: "#f1f1f1",
    border: "1px solid #2a2a2a",
  };

  return (
    <div>
      <h4 className="mb-3">Ringkasan Hari Ini</h4>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3" style={cardStyle}>
            <h5>Booking Hari Ini</h5>
            <h2 style={{ color: "#00d8ff" }}>12</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3" style={cardStyle}>
            <h5>Booking Minggu Ini</h5>
            <h2 style={{ color: "#00d8ff" }}>54</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3" style={cardStyle}>
            <h5>Booking Bulan Ini</h5>
            <h2 style={{ color: "#00d8ff" }}>210</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
