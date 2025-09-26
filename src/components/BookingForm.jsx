import React, { useState } from "react";
import { useBookings } from "../context/BookingContext";
import axios from "axios";

export default function BookingForm() {
  const { bookingOpen, adminMessage, addBooking, openHour, closeHour } = useBookings();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8080/api/bookings"; // backend kamu

  
  function validate() {
    if (!name || !email || !phone || !date || !time)
      return "Lengkapi semua field";

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) return "Nomor HP harus angka (10-15 digit)";

    const sel = new Date(date + "T" + time);
    if (sel < new Date()) return "Tidak bisa memilih waktu lampau";

    const h = sel.getHours();
    if (h < openHour || h >= closeHour)
      return `Jam operasional: ${openHour.toString().padStart(2, "0")}:00 - ${closeHour
        .toString()
        .padStart(2, "0")}:00`;

    return null;
  }

  async function submit(e) {
    e.preventDefault();
    setNotice(null);

    const v = validate();
    if (v) {
      setNotice({ type: "error", text: v });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(API_URL, {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        bookingDate: date,
        bookingTime: time,
      });

      addBooking(res.data); // simpan di context

      setNotice({
        type: "success",
        text: "Booking berhasil terkirim! Tunggu konfirmasi admin.",
      });

      // reset form
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("09:00");
    } catch (err) {
      console.error(err);
      setNotice({
        type: "error",
        text: "Gagal mengirim booking. Coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="booking-wrapper d-flex align-items-center justify-content-center">
      <div
        className="booking-card"
        style={{ textAlign: "left", maxWidth: "600px", width: "100%" }}
      >
        <h3 className="mb-3 text-center">Booking Dimensi Hair Studio</h3>

        {/* Kalau booking ditutup */}
        {!bookingOpen && (
          <div>
            <div
              className="alert alert-warning text-center mb-3"
              style={{ fontWeight: "500" }}
            >
              Booking sedang <b>ditutup</b>. Silakan cek kembali nanti.
            </div>
            {/* Pesan admin tetap tampil walau booking tutup */}
            {adminMessage && (
              <div
                className="alert"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: 0,
                  color: "#1e40af",
                  fontWeight: "500",
                }}
              >
                {adminMessage}
              </div>
            )}
          </div>
        )}

        {/* Kalau booking dibuka */}
        {bookingOpen && (
          <form onSubmit={submit}>
            {/* Pesan admin tampil di atas form */}
            {adminMessage && (
              <div
                className="alert mb-3"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: 0,
                  color: "#1e40af",
                  fontWeight: "500",
                }}
              >
                {adminMessage}
              </div>
            )}

            <div className="mb-2">
              <label>Nama</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-2">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-2">
              <label>Nomor HP</label>
              <input
                className="form-control"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[0-9]{10,15}"
                title="Nomor HP hanya angka (10-15 digit)"
              />
            </div>

            <div className="row gx-2">
              <div className="col">
                <label>Tanggal</label>
                <input
                  className="form-control"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <label>Waktu</label>
                <input
                  className="form-control"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              type="submit"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Kirim Booking"}
            </button>

            {notice && (
              <div
                className="alert mt-3"
                style={{
                  background:
                    notice.type === "error"
                      ? "rgba(220,38,38,0.12)"
                      : "rgba(34,197,94,0.12)",
                  border: 0,
                }}
              >
                {notice.text}
              </div>
            )}
            <p className="mt-2 small">
              Slot 1 jam — booking akan di-*confirm* oleh admin. Slot yang tidak
              dikonfirmasi dalam 20 menit akan hangus.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
