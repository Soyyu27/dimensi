import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-wrap">
        <img 
          src="/Dimensi.png" 
          alt="Dimensi Logo" 
          className="header-logo"
        />
      </div>
      <nav>
        <Link to="/">Profile</Link>
        <Link to="/booking">Booking</Link>
      </nav>
    </header>
  );
}
