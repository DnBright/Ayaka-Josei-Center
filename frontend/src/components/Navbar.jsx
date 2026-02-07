import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled shadow' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <div className="logo-wrapper">
            <span className="brand-text">AYAKA <small>JOSEI CENTER</small></span>
            <div className="vertical-divider"></div>
            <span className="tagline">LPK JEPANG <br /> <small>SPESIALIS PUTRI</small></span>
          </div>
        </Link>

        <div className="desktop-menu">
          <a href="#home">HOME</a>
          <a href="#profil">PROFIL</a>
          <a href="#program">PROGRAM SO AYAKA JOSEI CENTER</a>
          <a href="#galeri">GALERI</a>
          <a href="#blog">BLOG</a>
          <a href="#alumni">ALUMNI</a>
          <a href="#kontak">KONTAK</a>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu glass fade-in">
          <a href="#home" onClick={() => setIsOpen(false)}>HOME</a>
          <a href="#profil" onClick={() => setIsOpen(false)}>PROFIL</a>
          <a href="#program" onClick={() => setIsOpen(false)}>PROGRAM SO AYAKA JOSEI CENTER</a>
          <a href="#galeri" onClick={() => setIsOpen(false)}>GALERI</a>
          <a href="#blog" onClick={() => setIsOpen(false)}>BLOG</a>
          <a href="#alumni" onClick={() => setIsOpen(false)}>ALUMNI</a>
          <a href="#kontak" onClick={() => setIsOpen(false)}>KONTAK</a>
        </div>
      )}

      <style jsx="true">{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: var(--transition);
          padding: 1rem 0;
          background: var(--accent);
          color: white;
        }
        .navbar.scrolled {
          padding: 0.75rem 0;
          background: #e60000;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: 'Outfit', sans-serif;
          color: white;
          text-decoration: none;
        }
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .brand-text {
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1;
        }
        .brand-text small { font-size: 0.6rem; font-weight: 400; display: block; margin-top: 2px; }
        .vertical-divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 255, 255, 0.5);
        }
        .tagline {
          font-size: 0.75rem;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: 0.5px;
        }
        .tagline small { font-size: 0.55rem; font-weight: 500; }
        .desktop-menu {
          display: none;
        }
        @media (min-width: 1024px) {
          .desktop-menu {
            display: flex;
            gap: 1.5rem;
            align-items: center;
          }
          .desktop-menu a {
            font-size: 0.85rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.9);
            text-transform: uppercase;
          }
          .desktop-menu a:hover {
            color: white;
            text-shadow: 0 0 10px rgba(255,255,255,0.5);
          }
        }
        .mobile-toggle {
          display: block;
          background: none;
        }
        @media (min-width: 768px) {
          .mobile-toggle { display: none; }
        }
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: white;
          border-bottom: 1px solid var(--glass-border);
        }
        .btn-admin {
          background: var(--primary);
          color: white !important;
          padding: 0.5rem 1.25rem;
          border-radius: 8px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
