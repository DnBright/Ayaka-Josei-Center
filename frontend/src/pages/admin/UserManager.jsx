import React, { useState, useEffect } from 'react';
import { User, Shield, Plus, MoreVertical, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';

const UserManager = () => {
    const [activeTab, setActiveTab] = useState('internal');

    // Internal Users (Mock)
    const [internalUsers, setInternalUsers] = useState([
        { id: 1, name: 'Admin Utama', email: 'admin@ayakajosei.com', role: 'Super Admin', status: 'Active' },
        { id: 2, name: 'Editor Konten', email: 'editor@ayakajosei.com', role: 'Editor', status: 'Active' },
        { id: 3, name: 'Viewer Only', email: 'guest@ayakajosei.com', role: 'Viewer', status: 'Inactive' },
    ]);

    // Member Users (LocalStorage)
    const [pendingMembers, setPendingMembers] = useState([]);
    const [activeMembers, setActiveMembers] = useState([]);

    useEffect(() => {
        const loadMembers = () => {
            const pending = JSON.parse(localStorage.getItem('pending_members') || '[]');
            const active = JSON.parse(localStorage.getItem('active_members') || '[]');
            setPendingMembers(pending);
            setActiveMembers(active);
        };

        loadMembers();
        window.addEventListener('storage', loadMembers);
        return () => window.removeEventListener('storage', loadMembers);
    }, []);

    const handleApprove = (member) => {
        if (!window.confirm(`Setujui member ${member.name}?`)) return;

        const updatedPending = pendingMembers.filter(m => m.id !== member.id);
        const newMember = { ...member, status: 'Active' };
        const updatedActive = [...activeMembers, newMember];

        setPendingMembers(updatedPending);
        setActiveMembers(updatedActive);

        localStorage.setItem('pending_members', JSON.stringify(updatedPending));
        localStorage.setItem('active_members', JSON.stringify(updatedActive));

        // Force refresh for other components if needed
        window.dispatchEvent(new Event('storage'));
        alert(`Member ${member.name} berhasil disetujui!`);
    };

    const handleReject = (member) => {
        if (!window.confirm(`Tolak member ${member.name}?`)) return;

        const updatedPending = pendingMembers.filter(m => m.id !== member.id);
        setPendingMembers(updatedPending);
        localStorage.setItem('pending_members', JSON.stringify(updatedPending));

        window.dispatchEvent(new Event('storage'));
        alert(`Member ${member.name} ditolak.`);
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'Super Admin': return <span className="flex items-center gap-1 text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded"><Shield size={12} /> Super Admin</span>;
            case 'Editor': return <span className="flex items-center gap-1 text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded"><Edit2 size={12} /> Editor</span>;
            case 'Penulis': return <span className="flex items-center gap-1 text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded"><FileText size={12} /> Penulis</span>;
            case 'Member': return <span className="flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded"><User size={12} /> Member</span>;
            default: return <span className="flex items-center gap-1 text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded"><User size={12} /> Viewer</span>;
        }
    };

    return (
        <div className="user-manager">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold">Manajemen User</h2>
                    <p className="text-secondary text-sm">Kelola akses internal dan validasi member baru.</p>
                </div>
                {activeTab === 'internal' && (
                    <button className="bg-brand-red text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
                        <Plus size={18} /> Tambah Admin
                    </button>
                )}
            </div>

            {/* TABS */}
            <div className="flex gap-4 border-b mb-6">
                <button
                    onClick={() => setActiveTab('internal')}
                    className={`pb-3 font-semibold text-sm ${activeTab === 'internal' ? 'text-brand-red border-b-2 border-brand-red' : 'text-slate-500'}`}
                >
                    Internal Team
                </button>
                <button
                    onClick={() => setActiveTab('members')}
                    className={`pb-3 font-semibold text-sm flex items-center gap-2 ${activeTab === 'members' ? 'text-brand-red border-b-2 border-brand-red' : 'text-slate-500'}`}
                >
                    Validasi Member
                    {pendingMembers.length > 0 && (
                        <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{pendingMembers.length}</span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('active_members')}
                    className={`pb-3 font-semibold text-sm ${activeTab === 'active_members' ? 'text-brand-red border-b-2 border-brand-red' : 'text-slate-500'}`}
                >
                    Data Member Aktif
                </button>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b bg-slate-50 text-secondary text-sm">
                            <th className="p-4 font-semibold">User</th>
                            <th className="p-4 font-semibold">Contact</th>
                            <th className="p-4 font-semibold">Role / Status</th>
                            <th className="p-4 font-semibold text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* INTERNAL USERS */}
                        {activeTab === 'internal' && internalUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{user.name}</div>
                                            <div className="text-xs text-secondary">{user.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">{user.email}</td>
                                <td className="p-4">{getRoleBadge(user.role)}</td>
                                <td className="p-4 text-right">
                                    <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}

                        {/* PENDING MEMBERS */}
                        {activeTab === 'members' && (
                            pendingMembers.length > 0 ? pendingMembers.map((member) => (
                                <tr key={member.id} className="border-b hover:bg-red-50 bg-red-50/30">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold">{member.name}</div>
                                                <div className="text-xs text-secondary">Mendaftar: {member.date}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">
                                        <div>{member.email}</div>
                                        <div className="text-xs opacity-75">{member.phone}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">Pending Review</span>
                                    </td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => handleApprove(member)}
                                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 flex items-center gap-1"
                                        >
                                            <CheckCircle size={14} /> Terima (ACC)
                                        </button>
                                        <button
                                            onClick={() => handleReject(member)}
                                            className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 flex items-center gap-1"
                                        >
                                            <XCircle size={14} /> Tolak
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-400 italic">Tidak ada permintaan member baru.</td>
                                </tr>
                            )
                        )}

                        {/* ACTIVE MEMBERS */}
                        {activeTab === 'active_members' && activeMembers.map((member) => (
                            <tr key={member.id} className="border-b hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{member.name}</div>
                                            <div className="text-xs text-secondary">Member Active</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">
                                    <div>{member.email}</div>
                                    <div className="text-xs opacity-75">{member.phone}</div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Active Member</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .text-brand-red { color: var(--brand-red); }
                .bg-brand-red { background-color: var(--brand-red); }
                
                /* Table Enhancements */
                table { border-collapse: separate; border-spacing: 0; }
                thead tr { background: #f8fafc; }
                thead th { 
                    font-weight: 700; 
                    text-transform: uppercase; 
                    font-size: 0.75rem; 
                    letter-spacing: 0.5px;
                    color: #64748b;
                    padding: 1rem 1.5rem;
                }
                tbody tr { 
                    transition: all 0.2s; 
                    border-bottom: 1px solid #f1f5f9;
                }
                tbody tr:hover { background: #f8fafc; }
                tbody td { padding: 1.25rem 1.5rem; }
                
                /* Tabs */
                .flex.gap-4.border-b { border-color: #e2e8f0; }
                .flex.gap-4.border-b button {
                    position: relative;
                    padding-bottom: 1rem;
                    transition: all 0.2s;
                }
                .flex.gap-4.border-b button:hover { color: var(--brand-red); }
                
                /* Action Buttons */
                button { 
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
                    font-weight: 600;
                }
                button:hover { transform: translateY(-1px); }
                button:active { transform: translateY(0); }
                
                /* Badge Enhancements */
                .bg-orange-100 { background: #fff7ed; border: 1px solid #fed7aa; }
                .bg-green-100 { background: #f0fdf4; border: 1px solid #bbf7d0; }
                .bg-red-500 { 
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); 
                    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
                }
            `}</style>
        </div>
    );
};

export default UserManager;
