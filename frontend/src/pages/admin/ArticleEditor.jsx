import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Image as ImageIcon, Globe, Lock } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        status: 'draft',
        access_status: 'public',
        image: ''
    });

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        // In a real app we'd fetch specific ID
        // For now we get all and filter
        try {
            const token = localStorage.getItem('token');
            const resp = await axios.get('http://localhost:5001/api/admin/posts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const post = resp.data.find(p => p.id === parseInt(id));
            if (post) setFormData(post);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const slug = formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const dataToSave = { ...formData, slug };

        try {
            const token = localStorage.getItem('token');
            if (id) {
                await axios.put(`http://localhost:5001/api/admin/posts/${id}`, dataToSave, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:5001/api/admin/posts', dataToSave, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/admin/articles');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="article-editor">
            <div className="mb-6">
                <Link to="/admin/articles" className="flex items-center gap-2 text-slate-500 hover:text-brand-red font-semibold mb-2">
                    <ArrowLeft size={18} /> Kembali
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">{id ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h2>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <div className="glass-card p-6">
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Judul Artikel</label>
                            <input
                                type="text"
                                className="w-full p-4 text-xl font-bold border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                placeholder="Masukkan judul menarik di sini..."
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Ringkasan (Excerpt)</label>
                            <textarea
                                className="w-full p-3 border rounded-xl"
                                rows={3}
                                placeholder="Teks singkat yang muncul di daftar artikel..."
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Konten</label>
                            <textarea
                                className="w-full p-4 border rounded-xl font-mono text-sm leading-relaxed"
                                rows={15}
                                placeholder="Mulai menulis cerita Anda..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="font-bold border-b pb-3 mb-4">Pengaturan</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Kategori</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Tips, Info, dll"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Akses Konten</label>
                                <select
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.access_status}
                                    onChange={(e) => setFormData({ ...formData, access_status: e.target.value })}
                                >
                                    <option value="public">Publik (Semua Orang)</option>
                                    <option value="member">Hanya Member</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
                                <select
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="pending">Ajukan Publish</option>
                                    {localStorage.getItem('role') !== 'Penulis' && <option value="publish">Publikasikan Langsung</option>}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-brand-red text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all"
                        >
                            <Save size={18} /> {loading ? 'Menyimpan...' : (id ? 'Update Artikel' : 'Simpan Artikel')}
                        </button>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="font-bold border-b pb-3 mb-4">Featured Image</h3>
                        <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 mb-4 overflow-hidden">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon size={48} />
                            )}
                        </div>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg text-xs"
                            placeholder="URL Gambar..."
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                </div>
            </form>

            <style>{`
                .glass-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; }
                .text-brand-red { color: #da291c; }
                .bg-brand-red { background: #da291c; }
            `}</style>
        </div>
    );
};

export default ArticleEditor;
