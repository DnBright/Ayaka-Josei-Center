import React, { useState, useEffect } from 'react';
import { Plus, Book, Trash2, Download, Search } from 'lucide-react';
import axios from 'axios';

const EBookManager = () => {
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file_url: '',
        category: '',
        version: 'v1.0',
        status: 'draft'
    });

    useEffect(() => {
        fetchEbooks();
    }, []);

    const fetchEbooks = async () => {
        try {
            const token = localStorage.getItem('token');
            const resp = await axios.get('http://localhost:5002/api/admin/ebooks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Since there's no specific admin route to list all yet (except public), 
            // the backend currently returns public ones. This acts as a placeholder.
            setEbooks(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5002/api/admin/ebooks', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowForm(false);
            fetchEbooks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="ebook-manager">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Manajemen E-Book</h2>
                    <p className="text-secondary text-sm">Upload materi PDF untuk member.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-brand-red text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
                >
                    <Plus size={18} /> {showForm ? 'Batal' : 'Tambah E-Book'}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 mb-8 border-brand-red">
                    <h3 className="font-bold mb-4">Informasi Materi Baru</h3>
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Judul</label>
                            <input type="text" className="w-full p-2 border rounded-lg" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Kategori</label>
                            <input type="text" className="w-full p-2 border rounded-lg" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-500 mb-1">Deskripsi Singkat</label>
                            <textarea className="w-full p-2 border rounded-lg" rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">URL File (PDF)</label>
                            <input type="text" className="w-full p-2 border rounded-lg" placeholder="https://..." value={formData.file_url} onChange={e => setFormData({ ...formData, file_url: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Status</label>
                            <select className="w-full p-2 border rounded-lg" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="draft">Draft</option>
                                <option value="publish">Langsung Publish</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded-lg font-bold">Simpan & Ajukan</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ebooks.map(book => (
                    <div key={book.id} className="glass-card p-4 flex gap-4">
                        <div className="w-12 h-12 bg-red-50 text-brand-red flex items-center justify-center rounded-lg">
                            <Book size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold truncate text-slate-800">{book.title}</h4>
                            <p className="text-xs text-slate-500 truncate">{book.category} • {book.version || 'v1.0'}</p>
                            <div className="flex gap-2 mt-3">
                                <button className="text-xs font-bold text-blue-600">Edit</button>
                                <button className="text-xs font-bold text-red-600">Hapus</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .glass-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; }
                .text-brand-red { color: #da291c; }
                .bg-brand-red { background: #da291c; }
            `}</style>
        </div>
    );
};

export default EBookManager;
