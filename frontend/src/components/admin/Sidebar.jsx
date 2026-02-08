import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquare,
  Users,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
    { path: '/admin/pages', icon: <FileText size={20} />, label: 'Halaman & Konten' },
    { path: '/admin/media', icon: <Image size={20} />, label: 'Media & Galeri' },
    { path: '/admin/communications', icon: <MessageSquare size={20} />, label: 'Komunikasi' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'User & Role' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Pengaturan' },
  ];

  return (
    <aside className="admin-sidebar glass">
      <div className="sidebar-header">
        <div className="logo-section">
          <span className="brand-red">Ayaka</span> Josei Center
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <style>{`
        .admin-sidebar {
          width: var(--admin-sidebar-width);
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          background: white;
          border-right: 1px solid #e2e8f0;
          z-index: 50;
          box-shadow: 4px 0 24px rgba(0,0,0,0.02);
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .logo-section {
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 1.4rem;
            color: var(--brand-dark);
            letter-spacing: -0.5px;
        }
        
        .brand-red { color: var(--brand-red); }

        .sidebar-nav {
          flex: 1;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          color: #64748b;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
        }

        .nav-item:hover {
          background: #f8fafc;
          color: var(--brand-dark);
        }

        .nav-item.active {
          background: linear-gradient(135deg, var(--brand-red) 0%, #b91c1c 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(218, 41, 28, 0.25);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid #f1f5f9;
          background: #fcfcfc;
        }

        .btn-logout {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.85rem;
          border-radius: 12px;
          background: white;
          border: 1px solid #fee2e2;
          color: #ef4444;
          font-weight: 700;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background: #fef2f2;
          border-color: #fca5a5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
