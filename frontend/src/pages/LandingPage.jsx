import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import FloatingBadge from '../components/FloatingBadge';

const LandingPage = ({ content }) => {
    const observerRef = useRef(null);

    useEffect(() => {
        // Track Website Visit
        const trackVisit = async () => {
            try {
                await axios.post('http://127.0.0.1:5005/api/analytics/track', { type: 'visit' });
            } catch (err) {
                console.error('Failed to track visit:', err);
            }
        };
        trackVisit();

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((el) => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [content]);

    if (!content) return null;

    return (
        <div className="landing-wrapper is-ready">

            {/* 1. Hero Section (Identitas Utama) */}
            <Hero content={content} />

            {/* Floating Interactive Badge (AJC Style) */}
            <FloatingBadge />

            {/* 2. Profil Section (Gambaran Umum) */}
            {content?.profil && content.profil.isVisible !== false && (
                <section id="profil" className="section-padding reveal reveal-up">
                    <div className="container">
                        <div className="section-grid">
                            <div className="text-content">
                                <span className="section-badge">SIAPA KAMI</span>
                                <h2 className="section-title">{content.profil?.title}</h2>
                                <p className="section-tagline">{content.profil?.tagline}</p>
                                <p className="section-desc">{content.profil?.text}</p>
                                <div className="objective-box">
                                    <strong>TUJUAN KAMI:</strong>
                                    <p>{content.profil?.objective}</p>
                                </div>
                            </div>
                            <div className="visual-content">
                                <div className="image-stack">
                                    <div className="image-main" style={{ background: 'url(/assets/hero-bg.png) center/cover' }}></div>
                                    <div className="image-accent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 3. Program Section (Bidang Program) */}
            {content?.program && content.program.isVisible !== false && (
                <section id="program" className="section-padding bg-surface reveal reveal-up">
                    <div className="container">
                        <div className="section-header center">
                            <span className="section-badge">PROGRAM KAMI</span>
                            <h2 className="section-title">{content.program?.title}</h2>
                        </div>
                        <div className="program-grid">
                            {(content.program?.items || []).map((item, idx) => (
                                <div key={idx} className="program-card reveal reveal-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                    <div className="card-icon">0{idx + 1}</div>
                                    <h3>{item?.name}</h3>
                                    <p>{item?.desc}</p>
                                    <button className="card-link">Detail Program</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Manfaat Section (Manfaat Program) */}
            {content?.manfaat && content.manfaat.isVisible !== false && (
                <section id="manfaat" className="section-padding reveal reveal-up">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">MENGAPA JEPANG?</span>
                            <h2 className="section-title">{content.manfaat?.title}</h2>
                        </div>
                        <div className="manfaat-grid">
                            {(content.manfaat?.items || []).map((item, idx) => (
                                <div key={idx} className="manfaat-card reveal reveal-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                    <div className="manfaat-icon-box">
                                        <div className="manfaat-dot"></div>
                                    </div>
                                    <div className="manfaat-content">
                                        <h4>{item?.title}</h4>
                                        <p>{item?.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Alur Section (Alur Program) */}
            {content?.alur && content.alur.isVisible !== false && (
                <section id="alur" className="section-padding bg-surface reveal reveal-up">
                    <div className="container">
                        <div className="section-header center">
                            <span className="section-badge">TRANSPARANSI PROSES</span>
                            <h2 className="section-title">{content.alur?.title}</h2>
                        </div>
                        <div className="alur-timeline">
                            {(content.alur?.steps || []).map((step, idx) => (
                                <div key={idx} className="alur-step reveal reveal-left" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                    <div className="step-num">{idx + 1}</div>
                                    <div className="step-content">
                                        <h4>{step?.title}</h4>
                                        <p>{step?.desc}</p>
                                    </div>
                                    {idx < (content.alur?.steps?.length || 0) - 1 && <div className="step-connector"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 6. Alumni Section (Testimoni) */}
            {content?.alumni && content.alumni.isVisible !== false && (
                <section id="alumni" className="section-padding reveal reveal-up">
                    <div className="container">
                        <div className="section-header center">
                            <span className="section-badge">CERITA MEREKA</span>
                            <h2 className="section-title">{content.alumni?.title}</h2>
                        </div>
                        <div className="alumni-grid">
                            {(content.alumni?.items || []).map((item, idx) => (
                                <div key={idx} className="alumni-card reveal reveal-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                    <div className="quote-mark">“</div>
                                    <p className="alumni-quote">{item?.quote}</p>
                                    <div className="alumni-info">
                                        <div className="alumni-avatar">{item?.name ? item.name[0] : 'A'}</div>
                                        <h5 className="alumni-name">{item?.name}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7. Blog Section (Informasi & Edukasi) */}
            {content?.blog && content.blog.isVisible !== false && (
                <section id="blog" className="section-padding bg-surface reveal reveal-up">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">EDUKASI & BERITA</span>
                            <h2 className="section-title">{content.blog?.title}</h2>
                        </div>
                        <div className="blog-grid">
                            {(content.blog?.posts || []).map((post, idx) => (
                                <div key={idx} className="blog-card reveal reveal-up" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                    <div className="blog-image"></div>
                                    <div className="blog-content">
                                        <span className="blog-date">{post?.date}</span>
                                        <h4>{post?.title}</h4>
                                        <button className="blog-link">Baca Selengkapnya</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. CTA Section (Ajakan Bertindak) */}
            {content?.cta && content.cta.isVisible !== false && (
                <section id="cta" className="section-padding reveal reveal-up">
                    <div className="container">
                        <div className="cta-box">
                            <h2 className="cta-title">{content.cta?.title}</h2>
                            <p className="cta-subtitle">{content.cta?.subtitle}</p>
                            <div className="cta-actions">
                                <button className="btn-astra-main">{content.cta?.buttonPrimary}</button>
                                <button className="btn-astra-outline">{content.cta?.buttonSecondary}</button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <style jsx="true">{`
        .section-padding { padding: clamp(4rem, 10vw, 8rem) 0; }
        .bg-surface { background: #f8fafc; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

        /* Preloader Removed */

        .preloader-logo {
          font-size: 3rem;
          font-weight: 900;
          color: white;
          letter-spacing: 10px;
          margin-bottom: 2rem;
          animation: pulse-soft 2s infinite;
        }

        .preloader-bar { width: 200px; height: 2px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
        .bar-progress { width: 40%; height: 100%; background: var(--brand-red); animation: preloader-move 1.2s infinite; }

        @keyframes preloader-move { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }

        /* Section Typography */
        .section-badge { color: var(--brand-red); font-weight: 900; letter-spacing: 4px; font-size: 0.7rem; display: block; margin-bottom: 1.5rem; }
        .section-title { 
            font-size: clamp(2.2rem, 8vw, 3.5rem); 
            font-weight: 900; 
            color: #0f172a; 
            line-height: 1.1; 
            letter-spacing: -2px; 
            margin-bottom: 2rem; 
        }
        .section-tagline { font-size: 1.5rem; font-weight: 700; color: var(--brand-red); margin-bottom: 1rem; }
        .section-desc { font-size: 1.15rem; color: #64748b; line-height: 1.7; margin-bottom: 2.5rem; }

        .objective-box { padding: 2rem; background: #f1f5f9; border-left: 4px solid var(--brand-red); border-radius: 0 1rem 1rem 0; }
        .objective-box strong { display: block; color: #0f172a; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 0.5rem; }
        .objective-box p { color: #334155; font-style: italic; }

        /* Grid Patterns */
        .section-grid { display: grid; grid-template-columns: 1fr; gap: 5rem; align-items: center; }
        @media (min-width: 1024px) { .section-grid { grid-template-columns: 1fr 1fr; } }

        /* Program Cards */
        .program-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
        .program-card { background: white; padding: 4rem 3rem; border-radius: 2.5rem; box-shadow: var(--shadow-md); transition: all 0.5s ease; border: 1px solid #f1f5f9; }
        .program-card:hover { transform: translateY(-15px); box-shadow: var(--shadow-lg); border-color: rgba(218, 41, 28, 0.2); }
        .card-icon { font-size: 0.9rem; font-weight: 900; color: var(--brand-red); opacity: 0.4; margin-bottom: 2rem; }
        .program-card h3 { font-size: 1.8rem; font-weight: 900; margin-bottom: 1rem; color: #0f172a; }
        .program-card p { color: #64748b; line-height: 1.6; margin-bottom: 2.5rem; }
        .card-link { background: none; border: none; color: var(--brand-red); font-weight: 800; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.3s; }
        .program-card:hover .card-link { border-bottom-color: var(--brand-red); }

        /* Manfaat Grid */
        .manfaat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; }
        .manfaat-card { display: flex; gap: 2rem; align-items: flex-start; }
        .manfaat-icon-box { min-width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-md); }
        .manfaat-dot { width: 12px; height: 12px; background: var(--brand-red); border-radius: 50%; }
        .manfaat-content h4 { font-size: 1.4rem; font-weight: 900; margin-bottom: 0.75rem; color: #0f172a; }
        .manfaat-content p { color: #64748b; line-height: 1.6; }

        /* Alur Timeline */
        .alur-timeline { position: relative; display: flex; flex-direction: column; gap: 4rem; max-width: 800px; margin: 0 auto; }
        .alur-step { position: relative; display: flex; gap: clamp(1rem, 5vw, 3rem); align-items: center; }
        .step-num { min-width: clamp(48px, 10vw, 64px); height: clamp(48px, 10vw, 64px); background: var(--brand-red); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; z-index: 2; box-shadow: 0 10px 20px rgba(218, 41, 28, 0.3); }
        .step-content h4 { font-size: 1.6rem; font-weight: 900; margin-bottom: 0.5rem; color: #0f172a; }
        .step-content p { color: #64748b; font-size: 1.1rem; }
        .step-connector { position: absolute; left: 31px; top: 64px; width: 2px; height: calc(100% + 4rem - 64px); background: #e2e8f0; z-index: 1; }

        /* Alumni Cards */
        .alumni-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; }
        .alumni-card { background: white; padding: 4rem 3rem; border-radius: 3rem; box-shadow: var(--shadow-md); border: 1px solid #f1f5f9; }
        .quote-mark { font-size: 5rem; font-family: serif; color: var(--brand-red); opacity: 0.1; line-height: 1; margin-bottom: -2rem; }
        .alumni-quote { font-size: 1.25rem; font-weight: 500; font-style: italic; color: #334155; line-height: 1.7; margin-bottom: 3rem; position: relative; z-index: 2; }
        .alumni-info { display: flex; align-items: center; gap: 1.5rem; }
        .alumni-avatar { width: 50px; height: 50px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; color: var(--brand-red); }
        .alumni-name { font-size: 1.1rem; font-weight: 800; color: #0f172a; }

        /* Blog Grid */
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem; }
        .blog-card { background: white; border-radius: 2rem; overflow: hidden; box-shadow: var(--shadow-md); transition: all 0.4s ease; cursor: pointer; }
        .blog-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); }
        .blog-image { height: 200px; background: #e2e8f0; }
        .blog-content { padding: 2.5rem; }
        .blog-date { font-size: 0.8rem; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 1rem; }
        .blog-card h4 { font-size: 1.4rem; font-weight: 800; color: #0f172a; line-height: 1.4; margin-bottom: 2rem; }
        .blog-link { background: none; border: none; color: var(--brand-red); font-weight: 800; padding: 0; cursor: pointer; }

        /* CTA Section */
        .cta-box { background: #020617; padding: 6rem 4rem; border-radius: 4rem; text-align: center; color: white; position: relative; overflow: hidden; }
        .cta-box::before { content: ''; position: absolute; top: -50%; left: -20%; width: 60%; height: 200%; background: radial-gradient(circle, rgba(218, 41, 28, 0.15) 0%, transparent 70%); }
        .cta-title { font-size: clamp(2rem, 10vw, 4rem); font-weight: 900; margin-bottom: 1.5rem; position: relative; z-index: 1; letter-spacing: -2px; }
        .cta-subtitle { font-size: 1.4rem; color: #94a3b8; max-width: 700px; margin: 0 auto 4rem; position: relative; z-index: 1; }
        .cta-actions { display: flex; justify-content: center; gap: 2rem; position: relative; z-index: 1; }

        /* General Reveal */
        .reveal { opacity: 0; transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-up { transform: translateY(50px); }
        .reveal-left { transform: translateX(-50px); }
        .reveal.active { opacity: 1; transform: translate(0, 0); }

        @media (max-width: 768px) {
          .section-title { font-size: 2.8rem; }
          .cta-title { font-size: 2.5rem; }
          .cta-actions { flex-direction: column; }
          .manfaat-grid { grid-template-columns: 1fr; }
          .alur-step { gap: 1.5rem; }
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
