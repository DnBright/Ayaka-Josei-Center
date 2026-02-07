import React, { useEffect, useState } from 'react';
import { Globe, Target, Shield, Award, Users, FileCheck, Info, Sparkles, ArrowRight, Layers, Compass } from 'lucide-react';
import FragmentedValues from '../components/FragmentedValues';

const ProfilPage = ({ content }) => {
    const data = content?.profil_halaman;
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.page-reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, [content]);

    if (!data) return null;

    return (
        <div className="profil-page-wrapper">
            <div className="noise-overlay"></div>

            {/* EDITORIAL HERO - ASYMMETRIC */}
            <header className="edito-hero">
                <div className="edito-hero-bg">
                    <div className="floating-shape shape-1" style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}></div>
                    <div className="floating-shape shape-2" style={{ transform: `translate(${-scrollY * 0.1}px, ${-scrollY * 0.08}px)` }}></div>
                </div>
                <div className="container-edito">
                    <div className="hero-grid-edito">
                        <div className="hero-text-side">
                            <div className="reveal-stagger">
                                <span className="journal-label">EDITION 2026 // IDENTITY</span>
                                <h1 className="editorial-title">
                                    <span className="line-small">Eksklusivitas</span>
                                    <span className="line-huge">Pemberdayaan</span>
                                    <span className="line-medium">Wanita Indonesia</span>
                                </h1>
                                <p className="editorial-lead">
                                    Membangun jembatan masa depan bagi putri Indonesia untuk berkarir profesional di Jepang dengan standar kelas dunia yang tak tertandingi.
                                </p>
                            </div>
                        </div>
                        <div className="hero-visual-side">
                            <div className="image-magazine-frame">
                                <div className="magazine-img" style={{ transform: `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.05}px)` }}></div>
                                <div className="magazine-overlay"></div>
                                <div className="magazine-badge">
                                    <Compass size={32} />
                                    <span>TRUSTED PROVIDER</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* BENTO INTRO - NON-GRID MONOTONY BREAK */}
            <section className="bento-intro page-reveal reveal-up">
                <div className="container-edito">
                    <div className="bento-layout">
                        <div className="bento-item item-main glass-panel-edito">
                            <div className="bento-meta">EST. 2026</div>
                            <h2 className="bento-title">{data.pengantar?.title}</h2>
                            <p className="bento-desc">{data.pengantar?.content}</p>
                            <div className="bento-footer">
                                <ArrowRight className="spin-arrow" />
                                <span>LPK AYAKA GLOBAL INDONESIA</span>
                            </div>
                        </div>
                        <div className="bento-item item-accent-1">
                            <h3>Visi Strategis</h3>
                            <p>{data.visi?.content}</p>
                        </div>
                        <div className="bento-item item-accent-2">
                            <div className="year-highlight">100+</div>
                            <span>Alumni Sukses</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* LATAR BELAKANG - SPLIT FOCUS */}
            <section className="bg-editorial page-reveal reveal-up">
                <div className="container-edito">
                    <div className="editorial-split">
                        <div className="split-visual">
                            <div className="minimal-card" style={{ transform: `rotate(${-scrollY * 0.01}deg)` }}>
                                <Layers size={40} color="#da291c" />
                                <h4>Warisan & Dedikasi</h4>
                            </div>
                        </div>
                        <div className="split-text">
                            <span className="accent-red-bold">SEJARAH KAMI</span>
                            <h2 className="h2-editorial">{data.latarBelakang?.title}</h2>
                            <p className="p-editorial">{data.latarBelakang?.content}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MISSION PARALLAX STACK */}
            <section className="mission-parallax-section">
                <div className="container-edito">
                    <div className="parallax-stack">
                        <div className="stack-header">
                            <h2 className="h2-editorial white">Misi & Komitmen Terukur</h2>
                            <p className="white-opacity">Langkah nyata kami dalam mencetak profesionalisme global.</p>
                        </div>
                        <div className="stack-items">
                            {(data.misi?.items || []).map((item, idx) => (
                                <div key={idx} className="stack-row page-reveal reveal-left" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                    <span className="row-num">0{idx + 1}</span>
                                    <p className="row-text">{item}</p>
                                    <div className="row-line"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="parallax-bg-accent"></div>
            </section>

            {/* FRAGMENTED VALUES - BREAKING CARD GRID */}
            <section className="values-fragmented-section page-reveal reveal-up">
                <div className="container-edito text-center">
                    <span className="accent-red-bold">NILAI UTAMA</span>
                    <h2 className="h2-editorial">Pilar Integritas Ayaka</h2>
                </div>
                <div className="container-edito">
                    <FragmentedValues items={data.nilai?.items || []} />
                </div>
            </section>

            {/* LEGAL & IMPACT GRID */}
            <section className="impact-grid-section page-reveal reveal-up">
                <div className="container-edito">
                    <div className="grid-edito-4">
                        <div className="edito-block dark-block">
                            <h3>{data.fokus?.title}</h3>
                            <p>{data.fokus?.content}</p>
                        </div>
                        <div className="edito-block glass-block">
                            <h3>{data.legalitas?.title}</h3>
                            <p>{data.legalitas?.content}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CLOSING - MAGAZINE FINALE */}
            <section className="finale-section">
                <div className="container-edito">
                    <div className="finale-wrap page-reveal reveal-up">
                        <h2 className="finale-title">{data.penutup?.title}</h2>
                        <p className="finale-desc">{data.penutup?.content}</p>
                        <div className="finale-cta">
                            <button className="btn-magazine">
                                GABUNG SEKARANG
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx="true">{`
                .profil-page-wrapper {
                    background: #fdfdfd;
                    overflow-x: hidden;
                    font-family: 'Inter', sans-serif;
                }

                .noise-overlay {
                    position: fixed;
                    inset: 0;
                    background: url('https://grainy-gradients.vercel.app/noise.svg');
                    opacity: 0.03;
                    pointer-events: none;
                    z-index: 1000;
                }

                .container-edito {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 5%;
                }

                /* Reveal Styles */
                .page-reveal { opacity: 0; transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
                .reveal-up { transform: translateY(50px); }
                .reveal-left { transform: translateX(-50px); }
                .is-revealed { opacity: 1; transform: translate(0,0); }

                /* EDITORIAL HERO */
                .edito-hero {
                    height: 100vh;
                    min-height: 800px;
                    display: flex;
                    align-items: center;
                    background: #fff;
                    position: relative;
                    overflow: hidden;
                }
                .edito-hero-bg { position: absolute; inset: 0; z-index: 1; }
                .floating-shape { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.05; }
                .shape-1 { width: 600px; height: 600px; background: #da291c; top: -10%; left: -10%; }
                .shape-2 { width: 500px; height: 500px; background: #0f172a; bottom: -10%; right: -10%; }

                .hero-grid-edito { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; align-items: center; position: relative; z-index: 10; }
                .journal-label { display: block; font-weight: 900; letter-spacing: 5px; color: #da291c; font-size: 0.8rem; margin-bottom: 2rem; }
                
                .editorial-title { font-family: 'Outfit', sans-serif; font-weight: 900; line-height: 1; letter-spacing: -4px; color: #0f172a; }
                .editorial-title span { display: block; margin-bottom: 0.5rem; }
                .line-small { font-size: clamp(1rem, 3vw, 2rem); letter-spacing: 2px; text-transform: uppercase; font-weight: 400; color: #64748b; }
                .line-huge { font-size: clamp(3.5rem, 15vw, 8rem); color: #da291c; }
                .line-medium { font-size: clamp(2.5rem, 10vw, 5rem); }

                .editorial-lead { font-size: clamp(1.1rem, 4vw, 1.5rem); line-height: 1.6; color: #334155; max-width: 600px; margin-top: 3rem; }

                .image-magazine-frame { position: relative; width: 100%; height: 600px; border-radius: 20px; overflow: hidden; box-shadow: 40px 40px 100px rgba(0,0,0,0.1); }
                .magazine-img { width: 100%; height: 100%; background: #f1f5f9; background-image: url('/assets/hero-bg.png'); background-size: cover; background-position: center; transition: transform 0.1s linear; }
                .magazine-overlay { position: absolute; inset: 0; background: linear-gradient(45deg, rgba(15,23,42,0.2) 0%, transparent 100%); }
                .magazine-badge { position: absolute; bottom: 2rem; left: 2rem; background: #da291c; color: white; padding: 1.5rem; border-radius: 15px; display: flex; align-items: center; gap: 1rem; }
                .magazine-badge span { font-weight: 900; letter-spacing: 2px; font-size: 0.8rem; }

                /* BENTO INTRO */
                .bento-intro { padding: 10rem 0; }
                .bento-layout { display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: auto auto; gap: 2rem; }
                .bento-item { border-radius: 40px; padding: 4rem; transition: transform 0.5s ease; }
                .item-main { grid-row: span 2; background: white; border: 1px solid #f1f5f9; box-shadow: 0 40px 100px rgba(0,0,0,0.03); }
                .item-accent-1 { background: #0f172a; color: white; display: flex; flex-direction: column; justify-content: center; }
                .item-accent-2 { background: #da291c; color: white; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; }
                
                .bento-meta { font-weight: 900; color: #da291c; margin-bottom: 2rem; }
                .bento-title { font-size: clamp(2rem, 8vw, 3.5rem); font-weight: 900; margin-bottom: 2rem; letter-spacing: -2px; }
                .year-highlight { font-size: clamp(3rem, 10vw, 4rem); font-weight: 900; margin-bottom: 0.5rem; }

                /* EDITORIAL SPLIT */
                .bg-editorial { padding: 8rem 0; background: #f8fafc; }
                .editorial-split { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem, 8vw, 8rem); align-items: center; }
                .minimal-card { background: white; padding: 3rem; border-radius: 30px; box-shadow: 0 30px 60px rgba(0,0,0,0.05); text-align: center; width: 250px; }
                .minimal-card h4 { margin-top: 1.5rem; font-weight: 900; }
                .h2-editorial { font-size: clamp(2.2rem, 8vw, 3.5rem); font-weight: 900; letter-spacing: -2px; margin-bottom: 2rem; color: #0f172a; }
                .h2-editorial.white { color: white; }
                .p-editorial { font-size: clamp(1rem, 4vw, 1.25rem); line-height: 1.7; color: #475569; }
                .accent-red-bold { font-weight: 900; color: #da291c; letter-spacing: 4px; display: block; margin-bottom: 1.5rem; font-size: 0.8rem; text-transform: uppercase; }

                /* MISSION STACK */
                .mission-parallax-section { padding: 10rem 0; background: #0f172a; position: relative; overflow: hidden; }
                .stack-header { margin-bottom: 6rem; text-align: center; }
                .white-opacity { color: rgba(255,255,255,0.6); font-size: clamp(1rem, 3vw, 1.2rem); }
                .stack-row { display: flex; align-items: center; gap: clamp(1.5rem, 5vw, 4rem); padding: 3rem 0; border-top: 1px solid rgba(255,255,255,0.05); position: relative; }
                .row-num { font-size: clamp(2rem, 6vw, 3rem); font-weight: 900; color: #da291c; opacity: 0.3; }
                .row-text { font-size: clamp(1.2rem, 5vw, 1.8rem); font-weight: 600; color: white; }

                /* IMPACT GRID */
                .impact-grid-section { padding: 8rem 0; }
                .grid-edito-4 { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
                .edito-block { padding: 5rem; border-radius: 40px; }
                .dark-block { background: #0f172a; color: white; }
                .glass-block { background: white; border: 1px solid #f1f5f9; box-shadow: 0 40px 100px rgba(0,0,0,0.02); }

                /* FINALE */
                .finale-section { padding: 10rem 0; text-align: center; background: #fff; }
                .finale-title { font-size: clamp(2.5rem, 10vw, 5rem); font-weight: 900; letter-spacing: -4px; margin-bottom: 2rem; }
                .finale-desc { font-size: clamp(1.1rem, 4vw, 1.5rem); color: #64748b; max-width: 800px; margin: 0 auto 4rem; }
                .btn-magazine { background: #0f172a; color: white; padding: 1.8rem 4rem; border-radius: 100px; font-weight: 900; display: inline-flex; align-items: center; gap: 1.5rem; cursor: pointer; border: none; transition: 0.3s; }
                .btn-magazine:hover { background: #da291c; transform: scale(1.05); box-shadow: 0 30px 60px rgba(218, 41, 28, 0.3); }

                @media (max-width: 1024px) {
                    .container-edito { padding: 0 8%; }
                    .hero-grid-edito, .bento-layout, .editorial-split, .grid-edito-4 { grid-template-columns: 1fr; gap: 4rem; }
                    .image-magazine-frame { height: 450px; }
                    .bento-item { padding: 3rem; }
                    .edito-block { padding: 3rem; }
                }

                @media (max-width: 640px) {
                    .container-edito { padding: 0 5%; }
                    .edito-hero { height: auto; padding-top: 15vh; padding-bottom: 10vh; }
                    .hero-text-side { text-align: center; }
                    .editorial-lead { margin: 2rem auto 0; }
                    .image-magazine-frame { height: 350px; }
                    .magazine-badge { padding: 1rem; bottom: 1rem; left: 1rem; }
                    
                    .bento-item { border-radius: 30px; }
                    .editorial-split { gap: 3rem; }
                    
                    .stack-row { gap: 1.5rem; flex-direction: column; align-items: flex-start; text-align: left; }
                }
            `}</style>
        </div>
    );
};

export default ProfilPage;
