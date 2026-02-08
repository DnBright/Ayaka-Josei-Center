import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Book, Lock, AlertCircle, ChevronRight, Download, PlayCircle, FileText } from 'lucide-react';

const EBookPage = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ebooks, setEbooks] = useState([]);

    useEffect(() => {
        // Check for member session
        const storedMember = localStorage.getItem('member_user');
        if (!storedMember) {
            navigate('/member/login');
        } else {
            setMember(JSON.parse(storedMember));
            fetchEbooks();
        }
    }, [navigate]);

    const fetchEbooks = async () => {
        try {
            const resp = await axios.get('http://localhost:5001/api/ebooks');
            setEbooks(resp.data);
        } catch (err) {
            console.error('Error fetching ebooks:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="ebook-loader">Syncing Resources...</div>;

    return (
        <div className="ebook-wrapper">
            {/* Header / Hero */}
            <header className="ebook-hero">
                <div className="container">
                    <div className="hero-content reveal-up">
                        <span className="badge-member">MEMBER ACTIVE: {member?.email}</span>
                        <h1>E-LIBRARY <br /><span className="text-stroke">INTERNAL RESOURCES</span></h1>
                        <p className="hero-desc">
                            Akses materi eksklusif untuk pendalaman program.
                            Dilarang menyebarluaskan konten ini ke pihak luar.
                        </p>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <section className="ebook-list-section">
                <div className="container">
                    <div className="section-header reveal-up">
                        <h2>Arsip Materi</h2>
                        <div className="line-divider"></div>
                    </div>

                    <div className="ebook-grid">
                        {ebooks.map((book, idx) => (
                            <div className="ebook-card reveal-up" style={{ transitionDelay: `${idx * 0.1}s` }} key={book.id}>
                                <div className="card-icon-box">
                                    <Book size={40} />
                                </div>
                                <div className="card-content">
                                    <div className="card-meta">
                                        <span className="meta-ver">{book.version}</span>
                                        <span className="meta-cat">{book.category}</span>
                                    </div>
                                    <h3>{book.title}</h3>
                                    <p>{book.description}</p>
                                    <button className="btn-download">
                                        <Download size={18} /> UNDUH MATERI
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Warning */}
            <footer className="ebook-footer">
                <div className="container">
                    <div className="warning-box reveal-up">
                        <AlertCircle size={24} className="text-red" />
                        <p>
                            <strong>PERINGATAN:</strong> Semua materi di halaman ini adalah Hak Cipta Ayaka Josei Center.
                            Penyebaran tanpa izin dapat dikenakan sanksi keanggotaan.
                        </p>
                    </div>
                </div>
            </footer>

            <style jsx="true">{`
                .ebook-wrapper {
                    background: #f8fafc;
                    min-height: 100vh;
                    padding-bottom: 5rem;
                }
                .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

                /* HERO */
                .ebook-hero {
                    background: #fff;
                    padding: 8rem 0 4rem;
                    border-bottom: 1px solid #e2e8f0;
                }
                .badge-member {
                    display: inline-block;
                    background: #dcfce7;
                    color: #166534;
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    letter-spacing: 1px;
                }
                .ebook-hero h1 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 3.5rem;
                    font-weight: 900;
                    line-height: 1;
                    color: #0f172a;
                    margin-bottom: 1.5rem;
                }
                .text-stroke {
                    color: transparent;
                    -webkit-text-stroke: 1.5px #0f172a;
                }
                .hero-desc {
                    max-width: 600px;
                    font-size: 1.2rem;
                    color: #64748b;
                    line-height: 1.6;
                }

                /* LIST */
                .ebook-list-section { padding: 4rem 0; }
                .section-header { margin-bottom: 3rem; display: flex; align-items: center; gap: 1.5rem; }
                .section-header h2 { font-size: 2rem; font-weight: 800; color: #0f172a; font-family: 'Outfit', sans-serif;}
                .line-divider { height: 2px; flex: 1; background: #e2e8f0; }

                .ebook-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }

                .ebook-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    border: 1px solid #f1f5f9;
                    transition: 0.3s;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .ebook-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.05);
                    border-color: #da291c;
                }

                .card-icon-box {
                    width: 60px;
                    height: 60px;
                    background: #fef2f2;
                    color: #da291c;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                }

                .card-meta { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }

                .card-content h3 { font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 0.8rem; font-family: 'Outfit'; line-height: 1.3; }
                .card-content p { font-size: 0.95rem; color: #64748b; line-height: 1.5; margin-bottom: 1.5rem; }

                .btn-download {
                    width: 100%;
                    padding: 0.8rem;
                    background: #0f172a;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: 0.2s;
                    font-size: 0.9rem;
                }
                .btn-download:hover { background: #1e293b; }

                /* FOOTER WARNING */
                .warning-box {
                    max-width: 800px;
                    margin: 2rem auto;
                    background: #fff;
                    border: 1px solid #fee2e2;
                    border-left: 4px solid #da291c;
                    padding: 1.5rem;
                    border-radius: 8px;
                    display: flex;
                    gap: 1rem;
                    align-items: flex-start;
                }
                .text-red { color: #da291c; flex-shrink: 0; }
                .warning-box p { font-size: 0.9rem; color: #7f1d1d; line-height: 1.5; }

                /* ANIMATION */
                .reveal-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
                @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default EBookPage;
