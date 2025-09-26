import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [settings, setSettings] = useState({
    bookingOpen: true,
    openHour: 9,
    closeHour: 21,
    adminMessage: "",
  });

  const API_SETTINGS = "http://localhost:8080/api/settings";

  // Ambil settings dari backend
  useEffect(() => {
    axios.get(API_SETTINGS)
      .then(res => setSettings(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const res = await axios.put(API_SETTINGS, newSettings);
      setSettings(res.data);
    } catch (err) {
      console.error("Gagal update settings", err);
    }
  };

  function addBooking(newBooking) {
    setBookings((prev) => [...prev, newBooking]);
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        ...settings,
        updateSettings
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
