import React, { useState, useEffect } from 'react';
import { Plus, Book, Trash2, Download, Search, Eye } from 'lucide-react';
import axios from 'axios';

const EBookManager = () => {
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const path = window.location.pathname;
    const isPenulisPath = path.startsWith('/penulis');
    const keyPrefix = isPenulisPath ? 'penulis_' : 'admin_';

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
            const token = localStorage.getItem(`${keyPrefix}token`);
            const apiUrl = `http://${window.location.hostname}:5005/api/admin/ebooks`;
            const resp = await axios.get(apiUrl, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Since there's no specific admin route to list all yet (except public), 
            // the backend currently returns public ones. This acts as a placeholder.
            setEbooks(resp.data);
        } catch (err) {
            console.error('Failed to fetch ebooks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem(`${keyPrefix}token`);
            const apiUrl = `http://${window.location.hostname}:5005/api/admin/ebooks`;
            await axios.post(apiUrl, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowForm(false);
            fetchEbooks();
        } catch (err) {
            console.error('Failed to save ebook:', err);
        }
    };

    return (
        <div className="premium-manager-wrapper">
            <div className="manager-header">
                <div className="header-info">
                    <h2>Perpustakaan E-Book Materi</h2>
                    <p>Kelola koleksi materi edukasi digital untuk member Ayaka Josei Center.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-premium-action"
                >
                    {showForm ? 'Batal & Tutup' : (
                        <><Plus size={18} /> Upload E-Book Baru</>
                    )}
                </button>
            </div>

            {showForm && (
                <div className="premium-form-card">
                    <div className="form-head">
                        <h3>Informasi Materi Baru</h3>
                    </div>
                    <form onSubmit={handleSave} className="premium-form-grid">
                        <div className="field-group">
                            <label>Judul Materi</label>
                            <input type="text" placeholder="Contoh: Modul Dasar Bahasa Jepang" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div className="field-group">
                            <label>Kategori</label>
                            <input type="text" placeholder="E.g. Kurikulum, Tips, Budaya" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                        </div>
                        <div className="field-group full-width">
                            <label>Deskripsi Singkat</label>
                            <textarea rows={3} placeholder="Berikan gambaran isi materi ini..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="field-group">
                            <label>URL File (Akses G-Drive / Direct PDF)</label>
                            <input type="text" placeholder="https://drive.google.com/..." value={formData.file_url} onChange={e => setFormData({ ...formData, file_url: e.target.value })} />
                        </div>
                        <div className="field-group">
                            <label>Status Publikasi</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="draft">Simpan sebagai Draft</option>
                                <option value="publish">Publikasikan Sekarang</option>
                            </select>
                        </div>
                        <div className="form-actions full-width">
                            <button type="submit" className="btn-submit-premium">Simpan & Ajukan Publikasi</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="ebook-grid-premium">
                {ebooks.map(book => (
                    <div key={book.id} className="ebook-card-lux">
                        <div className="ebook-thumb">
                            <div className="thumb-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                <Book size={32} />
                            </div>
                            <div className="view-stats-bubble">
                                <Eye size={12} /> {book.views || 0}
                            </div>
                        </div>
                        <div className="ebook-info-lux">
                            <span className="cat-tag">{book.category || 'Materi'}</span>
                            <h4 title={book.title}>{book.title}</h4>
                            <p>{book.description || 'Tidak ada deskripsi tersedia untuk materi ini.'}</p>

                            <div className="ebook-meta-footer">
                                <div className="ver">Version {book.version || '1.0'}</div>
                                <div className="actions-mini">
                                    <button className="act-mini edit">Edit</button>
                                    <button className="act-mini delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .premium-manager-wrapper { padding: 1rem 0; }
                
                .manager-header { 
                    display: flex; justify-content: space-between; align-items: center; 
                    margin-bottom: 3rem; 
                }
                .header-info h2 { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 0.3rem; }
                .header-info p { color: #64748b; font-size: 1rem; }
                
                .btn-premium-action {
                    background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
                    color: white; padding: 0.8rem 1.5rem; border-radius: 14px;
                    display: flex; align-items: center; gap: 0.8rem;
                    font-weight: 800; font-size: 0.95rem;
                    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2);
                    transition: all 0.3s;
                    cursor: pointer;
                    border: none;
                }
                .btn-premium-action:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(239, 68, 68, 0.3); }

                /* FORM */
                .premium-form-card { 
                    background: white; border-radius: 24px; border: 1px solid #f1f5f9; 
                    margin-bottom: 3rem; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.05);
                }
                .form-head { padding: 1.5rem 2rem; border-bottom: 1px solid #f1f5f9; background: #fafafa; }
                .form-head h3 { font-size: 1rem; font-weight: 800; color: #0f172a; }
                
                .premium-form-grid { padding: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                .field-group { display: flex; flex-direction: column; gap: 0.5rem; }
                .field-group.full-width { grid-column: span 2; }
                .field-group label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
                .field-group input, .field-group textarea, .field-group select {
                    padding: 0.8rem 1rem; border: 1px solid #e2e8f0; border-radius: 12px;
                    font-size: 0.95rem; font-weight: 500; color: #0f172a; transition: 0.3s;
                    background: #f8fafc;
                }
                .field-group input:focus, .field-group textarea:focus { 
                    outline: none; border-color: #ef4444; background: white; 
                    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1); 
                }
                
                .btn-submit-premium {
                    width: 100%; padding: 1rem; background: #0f172a; color: white;
                    border: none; border-radius: 12px; font-weight: 700; cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-submit-premium:hover { background: #1e293b; transform: translateY(-2px); }

                /* GRID CARDS */
                .ebook-grid-premium { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
                .ebook-card-lux { 
                    background: white; border-radius: 24px; border: 1px solid #f1f5f9;
                    padding: 1.5rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex; gap: 1.5rem; align-items: flex-start;
                }
                .ebook-card-lux:hover { 
                    transform: translateY(-8px); 
                    box-shadow: 0 30px 60px rgba(0,0,0,0.08); 
                    border-color: #fee2e2;
                }
                
                .ebook-thumb {
                    position: relative; width: 100px; height: 120px; flex-shrink: 0;
                }
                .thumb-icon {
                    width: 100%; height: 100%; border-radius: 16px;
                    display: flex; align-items: center; justify-content: center;
                }
                .view-stats-bubble {
                    position: absolute; bottom: -8px; right: -8px;
                    background: white; border: 1px solid #f1f5f9; padding: 4px 8px;
                    border-radius: 100px; font-size: 0.7rem; font-weight: 800; color: #3b82f6;
                    display: flex; align-items: center; gap: 0.3rem;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .ebook-info-lux { flex: 1; min-width: 0; }
                .cat-tag { 
                    display: inline-block; background: #fef2f2; color: #ef4444; 
                    padding: 2px 8px; border-radius: 6px; font-size: 0.65rem; 
                    font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;
                }
                .ebook-info-lux h4 { 
                    font-size: 1.1rem; font-weight: 800; color: #0f172a; 
                    margin-bottom: 0.5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .ebook-info-lux p { 
                    font-size: 0.85rem; color: #64748b; line-height: 1.5;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                    margin-bottom: 1.2rem;
                }
                
                .ebook-meta-footer { 
                    display: flex; justify-content: space-between; align-items: center; 
                    padding-top: 1rem; border-top: 1px solid #f8fafc;
                }
                .ver { font-size: 0.75rem; font-weight: 700; color: #94a3b8; }
                .actions-mini { display: flex; gap: 0.8rem; }
                .act-mini { 
                    background: none; border: none; font-size: 0.75rem; font-weight: 800; 
                    cursor: pointer; transition: 0.2s; 
                }
                .act-mini.edit { color: #3b82f6; } .act-mini.edit:hover { color: #2563eb; }
                .act-mini.delete { color: #ef4444; } .act-mini.delete:hover { color: #b91c1c; }

                @media (max-width: 1400px) { .ebook-grid-premium { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 900px) { .ebook-grid-premium { grid-template-columns: 1fr; } .premium-form-grid { grid-template-columns: 1fr; } .field-group.full-width { grid-column: span 1; } }
            `}</style>
        </div>
    );
};

export default EBookManager;
