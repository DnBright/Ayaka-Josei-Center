import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout = () => {
    const token = localStorage.getItem('token');

    // Simple auth check - in a real app this might verify the token with backend
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="admin-layout">
            <Sidebar />

            <div className="admin-main">
                <AdminHeader title="Dashboard Overview" />

                <div className="admin-content-wrapper">
                    <Outlet />
                </div>
            </div>

            <style>{`
                .admin-layout {
                    display: flex;
                    min-height: 100vh;
                    background: #f8fafc;
                }

                .admin-main {
                    flex: 1;
                    margin-left: 260px; /* Sidebar width */
                    display: flex;
                    flex-direction: column;
                }

                .admin-content-wrapper {
                    padding: 2rem;
                    flex: 1;
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
