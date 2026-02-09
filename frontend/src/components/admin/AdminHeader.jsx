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
          height: 80px;
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #f1f5f9;
          padding: 0 3rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .header-content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1600px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 1.4rem;
          color: #0f172a;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 2.5rem;
        }

        .search-bar {
            position: relative;
            display: flex;
            align-items: center;
        }

        .search-icon {
            position: absolute;
            left: 16px;
            color: #94a3b8;
        }

        .search-bar input {
            padding: 0.7rem 1.5rem 0.7rem 3rem;
            border-radius: 14px;
            border: 1px solid #e2e8f0;
            background: #f8fafc;
            width: 300px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s;
        }

        .search-bar input:focus {
            outline: none;
            border-color: #ef4444;
            background: white;
            width: 350px;
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }

        .action-buttons {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .icon-btn {
            position: relative;
            background: white;
            color: #64748b;
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #f1f5f9;
            transition: all 0.2s;
        }

        .icon-btn:hover {
            background: #f8fafc;
            color: #ef4444;
            transform: translateY(-2px);
            border-color: #fee2e2;
        }

        .badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ef4444;
            color: white;
            font-size: 0.65rem;
            width: 18px;
            height: 18px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem;
            padding-left: 1.5rem;
            border-left: 1px solid #e2e8f0;
            cursor: pointer;
            transition: 0.2s;
        }
        
        .user-profile:hover { opacity: 0.8; }

        .avatar {
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            color: #ef4444;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            border: 1px solid #fee2e2;
        }

        .user-info {
            display: flex;
            flex-direction: column;
        }

        .user-info .name {
            font-size: 0.95rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.2;
        }

        .user-info .role {
            font-size: 0.75rem;
            color: #94a3b8;
            font-weight: 600;
        }
      `}</style>
        </header>
    );
};

export default AdminHeader;
