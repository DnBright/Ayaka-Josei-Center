import React, { useState } from 'react';
import { Upload, Image, Trash2, Search, Filter } from 'lucide-react';

const MediaManager = () => {
    // Simulated media data
    const [mediaItems, setMediaItems] = useState([
        { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1528659526084-59de817f5413?auto=format&fit=crop&q=80', name: 'Tokyo Street.jpg', size: '2.4 MB', date: '2024-01-15' },
        { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80', name: 'Student Batch 1.jpg', size: '1.8 MB', date: '2024-02-01' },
        { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&q=80', name: 'Classroom.jpg', size: '3.1 MB', date: '2024-02-10' },
        { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80', name: 'Japan Flag.jpg', size: '1.2 MB', date: '2024-03-05' },
    ]);

    const handleUpload = () => {
        alert('Fitur upload akan diimplementasikan dengan backend.');
    };

    const handleDelete = (id) => {
        if (window.confirm('Hapus file ini?')) {
            setMediaItems(items => items.filter(item => item.id !== id));
        }
    };

    return (
        <div className="media-manager">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold">Media Library</h2>
                    <p className="text-secondary text-sm">Kelola semua aset gambar dan video website.</p>
                </div>
                <button
                    onClick={handleUpload}
                    className="btn-primary flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-lg"
                >
                    <Upload size={18} /> Upload File
                </button>
            </div>

            {/* Toolbar */}
            <div className="glass-card p-4 mb-6 flex justify-between items-center">
                <div className="search-box relative">
                    <Search size={18} className="absolute left-3 top-2.5 text-secondary" />
                    <input
                        type="text"
                        placeholder="Cari file..."
                        className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:border-brand-red"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="p-2 border rounded hover:bg-slate-50 text-secondary">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-4 gap-4">
                {mediaItems.map((item) => (
                    <div key={item.id} className="media-item glass-card p-2 group relative">
                        <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-2 relative">
                            <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-white text-red-600 rounded-full hover:scale-110 transition-transform"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="px-1">
                            <h4 className="font-semibold text-sm truncate" title={item.name}>{item.name}</h4>
                            <div className="flex justify-between text-xs text-secondary mt-1">
                                <span>{item.size}</span>
                                <span>{item.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .text-brand-red { color: var(--brand-red); }
                .bg-brand-red { background-color: var(--brand-red); }
                .focus\\:border-brand-red:focus { border-color: var(--brand-red); }
                .aspect-square { aspect-ratio: 1 / 1; }
            `}</style>
        </div>
    );
};

export default MediaManager;
