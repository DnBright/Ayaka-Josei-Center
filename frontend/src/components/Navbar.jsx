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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'PROFIL', href: '#profil' },
    { name: 'PROGRAM', href: '#program' },
    { name: 'GALERI', href: '#galeri' },
    { name: 'BLOG', href: '#blog' },
    { name: 'ALUMNI', href: '#alumni' },
    { name: 'KONTAK', href: '#kontak' },
  ];

  // Dynamic classes for contrast
  const navClass = `navbar ${scrolled ? 'nav-scrolled' : ''} ${!isLandingPage ? 'nav-solid' : ''}`;

  return (
    <nav className={navClass}>
      <div className="container nav-container">
        {/* Logo Section */}
        <Link to="/" className="logo-section">
          <div className="logo-placeholder">
            <Globe size={24} />
          </div>
          <div className="logo-text">
            <span className="brand-primary">AYAKA</span>
            <span className="brand-secondary">JOSEI CENTER</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop-only">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="nav-link">
              {item.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="nav-actions desktop-only">
          <Link to="/login" className="btn-login-pill">
            <User size={18} />
            <span>Admin</span>
          </Link>
        </div>

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

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-overlay ${isOpen ? 'is-open' : ''}`} onClick={() => setIsOpen(false)}>
        <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <div className="logo-section" style={{ color: 'var(--brand-red)' }}>
              <Globe size={24} />
              <span className="brand-primary">AYAKA</span>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={32} />
            </button>
          </div>
          <div className="drawer-links">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="drawer-link"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="drawer-footer">
            <Link to="/login" className="mobile-admin-btn" onClick={() => setIsOpen(false)}>
              Access Admin Panel
            </Link>
          </div>
        </aside>
      </div>

      <style jsx="true">{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          color: var(--foreground); /* Dark text by default for visibility on light Hero */
        }

        .nav-scrolled, .nav-solid {
          padding: 0.75rem 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(218, 41, 28, 0.1);
          box-shadow: var(--shadow-md);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: inherit;
        }

        .logo-placeholder {
          width: 40px;
          height: 40px;
          background: var(--brand-red);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .brand-primary {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 1.5rem;
          letter-spacing: -0.5px;
          color: var(--brand-red);
        }

        .brand-secondary {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 2px;
          opacity: 0.8;
          color: var(--foreground);
        }

        .nav-menu {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          font-size: 0.85rem;
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
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--brand-red);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .btn-login-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background: var(--brand-red);
          color: white;
          border-radius: 50px;
          font-weight: 800;
          font-size: 0.85rem;
          text-decoration: none;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }

        .btn-login-pill:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .desktop-only { display: none; }
        @media (min-width: 1024px) {
          .desktop-only { display: flex; }
        }

        /* Mobile Hamburger */
        .mobile-toggle-btn {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: var(--foreground);
          z-index: 2001;
        }

        @media (min-width: 1024px) {
          .mobile-toggle-btn { display: none; }
        }

        .hamburger-line {
          width: 25px;
          height: 2px;
          background: currentColor;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .active .hamburger-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .active .hamburger-line:nth-child(2) { opacity: 0; }
        .active .hamburger-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        /* Mobile Drawer */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(5px);
          z-index: 2000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
        }

        .mobile-overlay.is-open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-drawer {
          position: absolute;
          top: 0;
          right: -300px;
          width: 300px;
          height: 100%;
          background: white;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -10px 0 30px rgba(0,0,0,0.1);
        }

        .is-open .mobile-drawer {
          right: 0;
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--secondary);
          cursor: pointer;
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .drawer-link {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--foreground);
          text-decoration: none;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f5f9;
          transition: color 0.3s ease;
        }

        .drawer-link:hover {
          color: var(--brand-red);
        }

        .drawer-footer {
          margin-top: auto;
        }

        .mobile-admin-btn {
          display: block;
          padding: 1rem;
          background: var(--brand-red);
          color: white;
          text-align: center;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 10px 20px -5px rgba(218, 41, 28, 0.3);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
