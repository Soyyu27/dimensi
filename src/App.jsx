import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GalaxyBackground from "./components/GalaxyBackground";
import Profile from "./components/Profile";
import BookingForm from "./components/BookingForm";
import Admin from "./pages/Admin";
import { BookingProvider } from "./context/BookingContext";

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Pages */}
          <Route
            path="/*"
            element={
              <>
                <GalaxyBackground />
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Profile />} />
                    <Route path="/booking" element={<BookingForm />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />

          {/* Admin Page (tanpa header/footer/galaxy) */}
          <Route path="/dimensiadmin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
