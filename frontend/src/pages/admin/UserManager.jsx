import React, { useState } from 'react';
import { User, Shield, Plus, MoreVertical, Trash2, Edit2 } from 'lucide-react';

const UserManager = () => {
    // Simulated users
    const [users, setUsers] = useState([
        { id: 1, name: 'Admin Utama', email: 'admin@ayakajosei.com', role: 'Super Admin', status: 'Active' },
        { id: 2, name: 'Editor Konten', email: 'editor@ayakajosei.com', role: 'Editor', status: 'Active' },
        { id: 3, name: 'Viewer Only', email: 'guest@ayakajosei.com', role: 'Viewer', status: 'Inactive' },
    ]);

    const getRoleBadge = (role) => {
        switch (role) {
            case 'Super Admin': return <span className="flex items-center gap-1 text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded"><Shield size={12} /> Super Admin</span>;
            case 'Editor': return <span className="flex items-center gap-1 text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded"><Edit2 size={12} /> Editor</span>;
            default: return <span className="flex items-center gap-1 text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded"><User size={12} /> Viewer</span>;
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Hapus user ini?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    return (
        <div className="user-manager">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold">Manajemen User</h2>
                    <p className="text-secondary text-sm">Kelola akses dan role pengguna dashboard.</p>
                </div>
                <button className="bg-brand-red text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
                    <Plus size={18} /> Tambah User
                </button>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b bg-slate-50 text-secondary text-sm">
                            <th className="p-4 font-semibold">User</th>
                            <th className="p-4 font-semibold">Role</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{user.name}</div>
                                            <div className="text-xs text-secondary">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">{getRoleBadge(user.role)}</td>
                                <td className="p-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleDelete(user.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .text-brand-red { color: var(--brand-red); }
                .bg-brand-red { background-color: var(--brand-red); }
            `}</style>
        </div>
    );
};

export default UserManager;
