import React, { useEffect } from "react";
import ThreeScene from "./ThreeScene";

export default function Profile(){
  useEffect(()=>{
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting) en.target.classList.add('in-view')
      })
    }, { threshold: 0.15 })
    els.forEach(el => io.observe(el))
    return ()=> io.disconnect()
  },[])

  return (
    <div className="profile-wrapper container-xl">
      {/* HERO */}
      <section className="hero section reveal">
        <div className="hero-inner">
          <ThreeScene />
          <div className="hero-canvas"></div>
          <h1 className="hero-title">Dimensi Hair Studio</h1>
          <p className="hero-sub">Elegance. Precision. Experience.</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section reveal">
        <h2>Layanan Kami</h2>
        <div className="row services mt-4">
          <div className="col-md-4 mb-3">
            <div className="service-card">
              <h5>Potong Rambut</h5>
              <p>Potongan rapi, sesuai bentuk wajah dan gaya.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="service-card">
              <h5>Styling</h5>
              <p>Styling modern untuk acara dan aktivitas sehari-hari.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="service-card">
              <h5>Grooming</h5>
              <p>Perawatan jenggot & facial grooming profesional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Dimensi */}
      <section className="section container text-center">
        <h2 className="mb-4">Dimensi Studio</h2>
        <p>
          Dimensi Hair Studio adalah barbershop modern yang lahir dari semangat seni dan gaya hidup urban.
          Kami percaya bahwa potongan rambut bukan sekadar perawatan, melainkan bentuk ekspresi diri.
          Dengan barberman profesional, ruang yang nyaman, dan layanan premium, kami siap memberikan
          pengalaman berbeda untuk setiap pelanggan.
        </p>
      </section>

      {/* Profil Barberman */}
      <section className="section container">
        <h2 className="mb-5 text-center">Barberman</h2>
        <div className="card shadow-lg border-0 p-4 d-flex flex-row align-items-center">
          {/* Foto kiri */}
          <div className="col-4 text-center">
            <img 
              src="/barber-abdul.jpg" 
              className="img-fluid rounded-circle" 
              alt="Barber Abdul"
              style={{maxWidth: "220px"}}
            />
          </div>

          {/* Info kanan */}
          <div className="col-8 ps-4">
            <h3 className="fw-bold mb-2">Abdul</h3>
            <p className="fs-8">
              Ahli potongan klasik & modern dengan pengalaman lebih dari 10 tahun.  
              Abdul dikenal dengan detail presisi, ketelitian, dan kemampuan memahami 
              gaya yang sesuai dengan kepribadian pelanggan.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontak" className="section reveal">
        <h2>Kontak</h2>
        <p><strong>Alamat:</strong> Jl. Contoh No.1, Jakarta</p>
        <p><strong>Jam buka:</strong> 09:00 - 20:00</p>
        <p><strong>Email:</strong> dimensi@example.com</p>
        <p><strong>WA:</strong> 0812-3456-7890</p>
      </section>
    </div>
  )
}
