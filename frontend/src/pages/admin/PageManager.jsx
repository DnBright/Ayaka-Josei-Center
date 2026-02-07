import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight, Edit3 } from 'lucide-react';

const PageManager = () => {
    const pages = [
        { id: 'hero', title: 'Home (Beranda)', desc: 'Headline, Subheadline, CTA', path: '/admin/pages/home' },
        { id: 'tentang', title: 'Tentang Ayaka', desc: 'Visi, Misi, Nilai Lembaga', path: '/admin/pages/about' },
        { id: 'program', title: 'Program', desc: 'Daftar Program & Kurikulum', path: '/admin/pages/program' },
        { id: 'galeri', title: 'Galeri', desc: 'Foto & Video Kegiatan', path: '/admin/pages/gallery' },
        { id: 'blog', title: 'Blog / Artikel', desc: 'Berita & Artikel Terkini', path: '/admin/pages/blog' },
        { id: 'alumni', title: 'Alumni', desc: 'Data Alumni & Testimoni', path: '/admin/pages/alumni' },
        { id: 'kontak', title: 'Kontak', desc: 'Informasi Kontak & Lokasi', path: '/admin/pages/contact' },
    ];

    return (
        <div className="page-manager">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Manajemen Halaman</h2>
                <p className="text-secondary">Pilih halaman yang ingin Anda edit kontennya.</p>
            </div>

            <div className="grid grid-2">
                {pages.map((page) => (
                    <Link key={page.id} to={page.path} className="page-card glass-card">
                        <div className="icon-wrapper">
                            <FileText size={24} />
                        </div>
                        <div className="card-content">
                            <h3 className="font-semibold text-lg">{page.title}</h3>
                            <p className="text-sm text-secondary">{page.desc}</p>
                        </div>
                        <div className="action-icon">
                            <div className="btn-icon">
                                <Edit3 size={18} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <style>{`
                .page-card {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    border-radius: 12px;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    color: inherit;
                    border: 1px solid transparent;
                }

                .page-card:hover {
                    transform: translateY(-2px);
                    border-color: var(--brand-red);
                    background: white;
                    box-shadow: 0 10px 25px -5px rgba(218, 41, 28, 0.1);
                }

                .icon-wrapper {
                    width: 48px;
                    height: 48px;
                    background: #fdf2f2;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--brand-red);
                }

                .card-content {
                    flex: 1;
                }

                .action-icon {
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: all 0.2s;
                }

                .page-card:hover .action-icon {
                    opacity: 1;
                    transform: translateX(0);
                }

                .btn-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: var(--brand-red);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </div>
    );
};

export default PageManager;
