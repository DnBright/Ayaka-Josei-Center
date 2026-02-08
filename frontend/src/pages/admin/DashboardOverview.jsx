import React from 'react';
import { Users, FileText, Image, MessageSquare } from 'lucide-react';

const DashboardOverview = ({ content }) => {
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username') || 'User';

    const adminStats = [
        { label: 'Total Pesan', value: '12', icon: <MessageSquare size={24} />, color: 'blue' },
        { label: 'Halaman Aktif', value: '7', icon: <FileText size={24} />, color: 'green' },
        { label: 'Total Galeri', value: '45', icon: <Image size={24} />, color: 'purple' },
        { label: 'Total Alumni', value: '128', icon: <Users size={24} />, color: 'orange' },
    ];

    const authorStats = [
        { label: 'Artikel Saya', value: '0', icon: <FileText size={24} />, color: 'blue' },
        { label: 'Pending Review', value: '0', icon: <MessageSquare size={24} />, color: 'orange' },
        { label: 'Media Upload', value: '0', icon: <Image size={24} />, color: 'purple' },
        { label: 'E-Book Materi', value: '3', icon: <Users size={24} />, color: 'green' },
    ];

    const stats = (role === 'Super Admin' || role === 'Editor') ? adminStats : authorStats;

    return (
        <div className="dashboard-overview">
            <div className="welcome-section mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Selamat Datang, {username}!</h2>
                <p className="text-secondary">Akses panel {role} Anda di Ayaka Josei Center.</p>
            </div>

            <div className="grid grid-4">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card glass-card">
                        <div className={`stat-icon ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-2 mt-8">
                <div className="glass-card p-6">
                    <h3>Status Konten</h3>
                    <p className="text-sm text-secondary mt-2">
                        Ringkasan status konten website saat ini.
                    </p>
                    {/* Placeholder for content status list */}
                    <div className="mt-4 space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                            <span>Program</span>
                            <span className="badge-success">Published</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                            <span>Blog</span>
                            <span className="badge-success">Published</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                            <span>Kontak</span>
                            <span className="badge-warning">Draft</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3>Pesan Terbaru</h3>
                    <p className="text-sm text-secondary mt-2">
                        Pesan masuk terbaru dari formulir kontak.
                    </p>
                    <div className="mt-4 text-center text-secondary py-8">
                        Belum ada pesan baru.
                    </div>
                </div>
            </div>

            <style>{`
                .mt-8 { margin-top: 2rem; }
                .p-6 { padding: 1.5rem; }
                .space-y-3 > * + * { margin-top: 0.75rem; }
                .text-sm { font-size: 0.875rem; }
                .text-secondary { color: var(--secondary); }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .items-center { align-items: center; }
                .bg-slate-50 { background-color: #f8fafc; }
                .rounded { border-radius: 0.375rem; }

                .stat-card {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .stat-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                }

                .stat-icon.blue { background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }
                .stat-icon.green { background: linear-gradient(135deg, #4ade80 0%, #16a34a 100%); box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3); }
                .stat-icon.purple { background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%); box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3); }
                .stat-icon.orange { background: linear-gradient(135deg, #fb923c 0%, #ea580c 100%); box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3); }

                .stat-info {
                    display: flex;
                    flex-direction: column;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--foreground);
                    line-height: 1;
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: var(--secondary);
                }

                .badge-success { background: #dcfce7; color: #166534; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
                .badge-warning { background: #fef9c3; color: #854d0e; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
            `}</style>
        </div>
    );
};

export default DashboardOverview;
