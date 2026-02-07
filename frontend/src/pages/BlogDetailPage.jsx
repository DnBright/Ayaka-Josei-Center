import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Info, User, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';

const BlogDetailPage = ({ content }) => {
    const { slug } = useParams();
    const data = content?.blog_halaman;
    const article = data?.artikel?.find(a => a.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) return <div className="read-loader">Retrieving Records...</div>;

    const relatedArticles = data.artikel.filter(a => a.id !== article.id).slice(0, 3);

    return (
        <div className="read-wrapper">
            {/* 1. ARTICLE HEADER - FOCUSED & LUX */}
            <header className="read-header">
                <div className="read-container">
                    <Link to="/blog" className="back-link-lux">
                        <ArrowLeft size={18} /> KEMBALI KE JOURNAL
                    </Link>

                    <div className="header-grid-lux">
                        <div className="header-text-side">
                            <span className="read-cat-tag">{article.category}</span>
                            <h1 className="read-title-lux">{article.title}</h1>
                            <div className="read-meta-box">
                                <div className="meta-item-lux">
                                    <Calendar size={16} />
                                    <span>{article.date}</span>
                                </div>
                                <div className="meta-item-lux">
                                    <User size={16} />
                                    <span>OFFICIAL AYAKA</span>
                                </div>
                            </div>
                        </div>
                        <div className="header-img-side">
                            <img src={article.image} alt={article.title} className="main-read-img" />
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. MAIN BODY - TYPOGRAPHY FOCUSED */}
            <main className="read-body">
                <div className="read-container-narrow">
                    <div className="read-content-main" dangerouslySetInnerHTML={{ __html: article.content }}></div>

                    <div className="read-share-lux">
                        <span>BAGIKAN ARTIKEL:</span>
                        <div className="share-icons-lux">
                            <button><Facebook size={20} /></button>
                            <button><Twitter size={20} /></button>
                            <button><LinkIcon size={20} /></button>
                        </div>
                    </div>
                </div>
            </main>

            {/* 3. SIDEBAR / RELATED - GAZETTE STYLE */}
            <section className="read-related">
                <div className="read-container">
                    <div className="related-header-lux">
                        <h2 className="related-title">SIMAK ARTIKEL LAINNYA</h2>
                        <div className="related-line"></div>
                    </div>

                    <div className="related-grid-lux">
                        {relatedArticles.map(rel => (
                            <Link key={rel.id} to={`/blog/${rel.slug}`} className="related-card-lux">
                                <span className="rel-tag">{rel.category}</span>
                                <h3>{rel.title}</h3>
                                <p>{rel.summary}</p>
                                <span className="rel-date">{rel.date}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. MANDATORY DISCLAIMER */}
            <footer className="read-footer">
                <div className="read-container-narrow">
                    <div className="read-disclaimer-box">
                        <div className="disc-header">
                            <Info size={20} />
                            <span>INFORMASI RESMI</span>
                        </div>
                        <p>{data.disclaimer}</p>
                    </div>
                </div>
            </footer>

            <style jsx="true">{`
                .read-wrapper {
                    --rd-red: #da291c;
                    --rd-dark: #0f172a;
                    --rd-grey: #64748b;
                    background: #fff;
                    padding-top: 100px;
                }

                .read-container { max-width: 1300px; margin: 0 auto; padding: 0 4rem; }
                .read-container-narrow { max-width: 850px; margin: 0 auto; padding: 0 2rem; }

                /* HEADER */
                .read-header { padding: 4rem 0 6rem; background: #f8fafc; }
                .back-link-lux { 
                    display: inline-flex; align-items: center; gap: 1rem; 
                    text-decoration: none; color: var(--rd-dark); font-weight: 900; 
                    font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 4rem;
                }
                .back-link-lux:hover { color: var(--rd-red); }

                .header-grid-lux { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 5rem; align-items: center; }
                
                .read-cat-tag { color: var(--rd-red); font-weight: 900; font-size: 0.8rem; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 2rem; display: block; }
                .read-title-lux { font-family: 'Outfit', sans-serif; font-size: 4rem; font-weight: 900; color: var(--rd-dark); line-height: 1.1; margin-bottom: 2.5rem; letter-spacing: -2px; }
                
                .read-meta-box { display: flex; gap: 3rem; border-top: 1px solid #e2e8f0; padding-top: 2rem; }
                .meta-item-lux { display: flex; align-items: center; gap: 0.8rem; font-weight: 800; color: var(--rd-grey); font-size: 0.85rem; }

                .main-read-img { width: 100%; border-radius: 12px; box-shadow: 0 20px 50px rgba(15,23,42,0.1); }

                /* BODY */
                .read-body { padding: 8rem 0; }
                .read-content-main { 
                    font-size: 1.25rem; line-height: 1.8; color: #334155; 
                }
                .read-content-main p { margin-bottom: 2.5rem; }
                .read-content-main strong { color: var(--rd-dark); font-weight: 900; }

                .read-share-lux { 
                    margin-top: 6rem; border-top: 1px solid #f1f5f9; padding-top: 3rem;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .read-share-lux span { font-weight: 900; letter-spacing: 2px; font-size: 0.8rem; color: var(--rd-dark); }
                .share-icons-lux { display: flex; gap: 1rem; }
                .share-icons-lux button { 
                    width: 45px; height: 45px; border-radius: 50%; border: 1px solid #e2e8f0; 
                    background: transparent; color: var(--rd-dark); cursor: pointer; transition: 0.3s;
                }
                .share-icons-lux button:hover { background: var(--rd-dark); color: white; border-color: var(--jr-dark); }

                /* RELATED */
                .read-related { padding: 8rem 0; background: #0f172a; color: white; }
                .related-header-lux { text-align: center; margin-bottom: 5rem; }
                .related-title { font-size: 2rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 1.5rem; }
                .related-line { width: 60px; height: 3px; background: var(--rd-red); margin: 0 auto; }

                .related-grid-lux { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
                .related-card-lux { 
                    text-decoration: none; color: white; padding: 2.5rem; border: 1px solid rgba(255,255,255,0.1);
                    transition: all 0.4s ease;
                }
                .related-card-lux:hover { background: rgba(255,255,255,0.05); transform: translateY(-10px); border-color: var(--rd-red); }
                
                .rel-tag { font-size: 0.7rem; font-weight: 900; color: var(--rd-red); letter-spacing: 2px; margin-bottom: 1.5rem; display: block; }
                .related-card-lux h3 { font-size: 1.5rem; font-weight: 900; margin-bottom: 1rem; line-height: 1.3; }
                .related-card-lux p { color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.5; margin-bottom: 2rem; }
                .rel-date { font-size: 0.75rem; font-weight: 800; opacity: 0.4; text-transform: uppercase; }

                /* FOOTER */
                .read-footer { padding: 4rem 0 8rem; }
                .read-disclaimer-box { 
                    background: #f8fafc; border-left: 6px solid var(--rd-red); padding: 3rem;
                }
                .disc-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; color: var(--rd-red); font-weight: 900; font-size: 0.85rem; letter-spacing: 2px; }
                .read-disclaimer-box p { color: #64748b; font-size: 1rem; line-height: 1.6; font-style: italic; }

                @media (max-width: 1024px) {
                    .read-container { padding: 0 2rem; }
                    .header-grid-lux { grid-template-columns: 1fr; gap: 3rem; }
                    .read-title-lux { font-size: 2.8rem; }
                    .related-grid-lux { grid-template-columns: 1fr; }
                    .read-meta-box { flex-direction: column; gap: 1rem; }
                }

                .read-loader { height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 2rem; letter-spacing: 5px; color: var(--rd-dark); }
            `}</style>
        </div>
    );
};

export default BlogDetailPage;
