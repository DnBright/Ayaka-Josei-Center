import React, { useState, useEffect } from 'react';
import { Plus, FileText, Edit2, Trash2, Eye, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArticleManager = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const role = localStorage.getItem('role');
    const prefix = (role === 'Super Admin' || role === 'Editor') ? '/admin' : '/penulis';

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const token = localStorage.getItem('token');
            const resp = await axios.get('http://localhost:5002/api/admin/posts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setArticles(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'publish': return <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Published</span>;
            case 'pending': return <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded">Pending Review</span>;
            default: return <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">Draft</span>;
        }
    };

    const filteredArticles = articles.filter(art =>
        art.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="article-manager">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Semua Artikel</h2>
                    <p className="text-secondary text-sm">Kelola tulisan Anda di sini.</p>
                </div>
                <Link to={`${prefix}/articles/new`} className="bg-brand-red text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
                    <Plus size={18} /> Tambah Baru
                </Link>
            </div>

            <div className="glass-card p-4 mb-6 flex items-center gap-2">
                <Search size={18} className="text-slate-400" />
                <input
                    type="text"
                    placeholder="Cari judul artikel..."
                    className="bg-transparent border-none outline-none w-full text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b">
                        <tr className="text-xs uppercase text-slate-500 font-bold">
                            <th className="p-4">Judul</th>
                            <th className="p-4">Kategori</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Tanggal</th>
                            <th className="p-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.map(art => (
                            <tr key={art.id} className="border-b hover:bg-slate-50 transition-colors">
                                <td className="p-4">
                                    <div className="font-semibold text-slate-700">{art.title}</div>
                                    <div className="text-xs text-slate-400">Slug: {art.slug}</div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">{art.category}</td>
                                <td className="p-4">{getStatusBadge(art.status)}</td>
                                <td className="p-4 text-sm text-slate-500">{new Date(art.created_at).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`${prefix}/articles/edit/${art.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                            <Edit2 size={16} />
                                        </Link>
                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredArticles.length === 0 && !loading && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-400 italic">Belum ada artikel.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <style>{`
                .glass-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; }
                .text-brand-red { color: #da291c; }
                .bg-brand-red { background: #da291c; }
            `}</style>
        </div>
    );
};

export default ArticleManager;
