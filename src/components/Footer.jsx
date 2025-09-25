import React from "react";

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container text-center">
        <div className="footer-inner">
          <p className="mb-1">© {new Date().getFullYear()} Dimensi Hair Studio — All rights reserved</p>
          <div className="footer-stars">
            {[...Array(14)].map((_,i)=> <span key={i} className="f-star">✦</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
