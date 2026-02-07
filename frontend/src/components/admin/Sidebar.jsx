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
          width: 260px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          background: white;
          border-right: 1px solid var(--glass-border);
          z-index: 50;
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .logo-section {
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            font-size: 1.2rem;
            color: var(--foreground);
        }
        
        .brand-red {
            color: var(--brand-red);
        }

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
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: var(--secondary);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background: #fdf2f2;
          color: var(--brand-red);
        }

        .nav-item.active {
          background: var(--brand-red);
          color: white;
          box-shadow: 0 4px 12px rgba(218, 41, 28, 0.15);
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        .btn-logout {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 8px;
          background: #fee2e2;
          color: #d32f2f;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background: #fecaca;
        }
      `}</style>
        </aside>
    );
};

export default Sidebar;
