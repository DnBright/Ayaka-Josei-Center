import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', href: '/', isAnchor: false },
    { name: 'PROFIL', href: '/profil', isAnchor: false },
    { name: 'PROGRAM', href: '/program', isAnchor: false },
    { name: 'GALERI', href: '/galeri', isAnchor: false },
    { name: 'BLOG', href: '/blog', isAnchor: false },
    { name: 'ALUMNI', href: '/alumni', isAnchor: false },
    { name: 'KONTAK', href: '/kontak', isAnchor: false },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : 'nav-hero'}`}>
      <div className="container nav-container">
        {/* Logo Section */}
        <Link to="/" className="logo-section">
          <div className="logo-icon">
            <Globe size={28} />
          </div>
          <div className="logo-text">
            <span className="brand-primary">AYAKA</span>
            <span className="brand-tagline">JOSEI CENTER</span>
          </div>
        </Link>

        {/* Desktop Navigation - Astra Style Spacing */}
        <div className="nav-menu desktop-only">
          {navItems.map((item) => (
            item.isAnchor && isLandingPage ? (
              <a key={item.name} href={item.href.replace('/', '')} className="nav-link">
                {item.name}
              </a>
            ) : (
              <Link key={item.name} to={item.href} className="nav-link">
                {item.name}
              </Link>
            )
          ))}
        </div>

        {/* Actions removed (Admin Button) */}

        {/* Mobile Toggle */}
        <button
          className={`mobile-toggle-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Drawer (Astra Style) */}
      <div className={`mobile-overlay ${isOpen ? 'is-open' : ''}`} onClick={() => setIsOpen(false)}>
        <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <span className="brand-primary" style={{ color: 'var(--brand-red)' }}>AYAKA</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
          </div>
          <div className="drawer-links">
            {navItems.map((item) => (
              item.isAnchor && isLandingPage ? (
                <a
                  key={item.name}
                  href={item.href.replace('/', '')}
                  className="drawer-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="drawer-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
          {/* Mobile Admin Login removed */}
        </aside>
      </div>

      <style jsx="true">{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: clamp(1rem, 3vw, 2rem) 0;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-hero {
          background: transparent;
          color: white;
        }

        .nav-scrolled {
          padding: 1rem 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: #1a1a1a;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1300px; /* Spacious Astra feel */
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: inherit;
        }

        .logo-icon {
          color: var(--brand-red);
          display: flex;
          align-items: center;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .brand-primary {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 1.6rem;
          letter-spacing: -1px;
        }

        .brand-tagline {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 2px;
          opacity: 0.7;
        }

        .nav-menu {
          display: flex;
          gap: 2.5rem; /* Astra-style item spacing */
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-decoration: none;
          color: inherit;
          padding: 0.5rem 0;
          position: relative;
          transition: opacity 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 3px;
          background: var(--brand-red);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .nav-link:hover {
          opacity: 0.8;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .btn-astra-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.75rem;
          background: var(--brand-red);
          color: white !important;
          border-radius: 50px;
          font-weight: 900;
          font-size: 0.8rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 20px -5px rgba(218, 41, 28, 0.4);
        }

        .btn-astra-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 25px -5px rgba(218, 41, 28, 0.5);
          background: #ff3d2e;
        }

        .desktop-only { display: none; }
        @media (min-width: 1024px) {
          .desktop-only { display: flex !important; }
        }

        /* Hamburger Styles */
        .mobile-toggle-btn {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          color: inherit;
          z-index: 2001;
          transition: opacity 0.3s ease;
        }

        .mobile-toggle-btn.active {
          opacity: 0;
          pointer-events: none;
        }

        @media (min-width: 1024px) { 
          .mobile-toggle-btn { display: none !important; } 
          .mobile-overlay { display: none !important; }
        }

        .hamburger-line {
          width: 25px;
          height: 2px;
          background: currentColor;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .active .hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .active .hamburger-line:nth-child(2) { opacity: 0; }
        .active .hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile Drawer */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.4); /* Dark muted overlay */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 2000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
        }

        .mobile-overlay.is-open { opacity: 1; visibility: visible; }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 85%;
          max-width: 320px;
          height: 100vh;
          background-color: #ffffff !important;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transform: translateX(100%); /* Start hidden on the right */
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -15px 0 50px rgba(0,0,0,0.1);
          z-index: 2002;
        }

        .is-open .mobile-drawer { transform: translateX(0); } /* Slide in to zero */

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .close-btn { 
          background: #f8fafc; 
          border: none; 
          color: #64748b; 
          cursor: pointer; 
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover { background: #fee2e2; color: var(--brand-red); }

        .drawer-links { display: flex; flex-direction: column; gap: 0.5rem; }

        .drawer-link {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          text-decoration: none;
          padding: 1.25rem 1rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .drawer-link:hover {
          background: #fdf2f2;
          color: var(--brand-red);
          transform: translateX(5px);
        }

        .mobile-admin-login {
          margin-top: auto;
          background: var(--brand-red);
          color: white;
          text-align: center;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 900;
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
