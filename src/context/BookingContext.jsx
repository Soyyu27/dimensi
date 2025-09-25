import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [bookingOpen, setBookingOpen] = useState(true);
  const [adminMessage, setAdminMessage] = useState("");

  function addBooking(newBooking) {
    setBookings((prev) => [...prev, { id: prev.length + 1, ...newBooking }]);
  }

  function toggleBookingOpen() {
    setBookingOpen((prev) => !prev);
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        bookingOpen,
        toggleBookingOpen,
        adminMessage,
        setAdminMessage,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
