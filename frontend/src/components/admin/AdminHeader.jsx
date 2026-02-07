import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const AdminHeader = ({ title }) => {
    return (
        <header className="admin-header glass">
            <div className="header-content">
                <h2 className="page-title">{title}</h2>

                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Cari..." />
                    </div>

                    <div className="action-buttons">
                        <button className="icon-btn">
                            <Bell size={20} />
                            <span className="badge">3</span>
                        </button>
                        <div className="user-profile">
                            <div className="avatar">
                                <User size={20} />
                            </div>
                            <div className="user-info">
                                <span className="name">Admin</span>
                                <span className="role">Super Admin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .admin-header {
          height: 70px;
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding: 0 2rem;
        }

        .header-content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 1.25rem;
          color: var(--foreground);
          font-weight: 700;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .search-bar {
            position: relative;
            display: flex;
            align-items: center;
        }

        .search-icon {
            position: absolute;
            left: 12px;
            color: var(--secondary);
        }

        .search-bar input {
            padding: 0.5rem 1rem 0.5rem 2.5rem;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            background: #f8fafc;
            width: 250px;
            font-size: 0.9rem;
            transition: all 0.2s;
        }

        .search-bar input:focus {
            outline: none;
            border-color: var(--brand-red);
            background: white;
            box-shadow: 0 0 0 3px rgba(218, 41, 28, 0.1);
        }

        .action-buttons {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .icon-btn {
            position: relative;
            background: transparent;
            color: var(--secondary);
            padding: 0.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .icon-btn:hover {
            background: #f1f5f9;
            color: var(--brand-red);
        }

        .badge {
            position: absolute;
            top: 2px;
            right: 2px;
            background: var(--brand-red);
            color: white;
            font-size: 0.6rem;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            border: 2px solid white;
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding-left: 1.5rem;
            border-left: 1px solid #e2e8f0;
        }

        .avatar {
            width: 36px;
            height: 36px;
            background: #fee2e2;
            color: var(--brand-red);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .user-info {
            display: flex;
            flex-direction: column;
        }

        .user-info .name {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--foreground);
            line-height: 1.2;
        }

        .user-info .role {
            font-size: 0.75rem;
            color: var(--secondary);
        }
      `}</style>
        </header>
    );
};

export default AdminHeader;
