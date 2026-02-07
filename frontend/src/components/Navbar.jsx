import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
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

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : 'nav-hero'}`}>
      <div className="container nav-container">

        {/* 1. LOGO SECTION (ISOLATED) */}
        <Link to="/" className="logo-pill">
          <img
            src="/assets/logo ayakan.png"
            alt="Ayaka Josei Center"
            className="logo-img"
          />
        </Link>

        {/* 2. NAVIGATION PILL (FLOATING ISLAND) */}
        <div className="nav-pill-wrapper desktop-only">
          <div className="nav-pill">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`pill-link ${active ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3. SOCIAL / EXTRA (Optional placeholder for balance) */}
        <div className="nav-actions desktop-only">
          {/* Can add Social Icons here later if needed, keeps layout balanced */}
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

      {/* Mobile Drawer */}
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
              <Link
                key={item.name}
                to={item.href}
                className={`drawer-link ${isActive(item.href) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
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
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none; /* Let clicks pass through empty space */
        }
        
        .container { pointer-events: auto; } /* Re-enable clicks on content */

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5%;
        }

        /* LOGO PILL */
        .logo-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          background: #fff;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
          height: 50px; /* Fixed height for consistency */
        }
        .logo-pill:hover { transform: scale(1.05); }

        .logo-img {
          height: 35px; /* Adjust based on logo aspect ratio */
          width: auto;
          object-fit: contain;
        }

        .brand-primary { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.4rem; letter-spacing: -1px; }

        /* NAV PILL (THE FLOATING ISLAND) */
        .nav-pill {
          background: #ffffff;
          padding: 0.5rem 0.5rem;
          border-radius: 100px;
          display: flex;
          gap: 0.25rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          pointer-events: auto;
          border: 1px solid rgba(0,0,0,0.02);
        }

        .pill-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border-radius: 100px;
          transition: all 0.3s ease;
          position: relative;
        }

        .pill-link:hover {
          color: #0f172a;
          background: #f1f5f9;
        }

        /* ACTIVE STATE INDICATOR */
        .pill-link.active {
          background: #0f172a; /* Dark pill for active */
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.2);
        }

        /* MOBILE STYLES */
        .mobile-toggle-btn {
          pointer-events: auto;
          background: #fff;
          padding: 12px;
          border-radius: 50%;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          color: #0f172a;
          border: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }
        
        .hamburger-line { width: 24px; height: 2px; background: currentColor; transition: 0.3s; }
        .active .hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .active .hamburger-line:nth-child(2) { opacity: 0; }
        .active .hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .desktop-only { display: none; }
        @media (min-width: 1024px) {
          .desktop-only { display: block; }
          .mobile-toggle-btn { display: none !important; }
          .mobile-overlay { display: none !important; }
        }

        /* DRAWER */
        .mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000; opacity: 0; visibility: hidden; transition: 0.3s; pointer-events: auto; }
        .mobile-overlay.is-open { opacity: 1; visibility: visible; }
        
        .mobile-drawer {
          position: fixed; top: 0; right: 0; width: 80%; max-width: 320px; height: 100vh;
          background: white; padding: 2rem; transform: translateX(100%); transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-open .mobile-drawer { transform: translateX(0); }

        .drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .close-btn { background: #f1f5f9; border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        
        .drawer-links { display: flex; flex-direction: column; gap: 0.5rem; }
        .drawer-link {
          font-size: 1.1rem; font-weight: 700; color: #334155; text-decoration: none; padding: 1rem; border-radius: 12px;
        }
        .drawer-link.active {
          background: var(--brand-red); color: white;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
