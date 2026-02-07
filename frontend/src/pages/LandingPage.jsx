import React from 'react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import { CheckCircle, Users, Award, Briefcase } from 'lucide-react';

const LandingPage = ({ content }) => {
    if (!content) return null;

    return (
        <div className="landing-page">
            <Hero data={content.home} />

            {content.profil?.isVisible && (
                <Section id="profil" title={content.profil.title} centered>
                    <div className="about-grid grid grid-2">
                        <div className="about-text fade-in">
                            <p>{content.profil.text}</p>
                            <ul className="feature-list">
                                <li><CheckCircle size={20} color="var(--accent)" /> <span>Pelatihan Bahasa Jepang Terpadu</span></li>
                                <li><CheckCircle size={20} color="var(--accent)" /> <span>Sertifikasi Tokutei Ginou</span></li>
                                <li><CheckCircle size={20} color="var(--accent)" /> <span>Penempatan Kerja Aman & Legal</span></li>
                            </ul>
                        </div>
                        <div className="about-stats grid grid-2 fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="stat-card glass-card">
                                <Users size={32} color="var(--accent)" />
                                <h4>1000+</h4>
                                <p>Pendaftar</p>
                            </div>
                            <div className="stat-card glass-card">
                                <Award size={32} color="var(--accent)" />
                                <h4>95%</h4>
                                <p>Tingkat Kelulusan</p>
                            </div>
                        </div>
                    </div>
                </Section>
            )}

            {content.program?.isVisible && (
                <Section id="program" title={content.program.title} className="bg-light" centered>
                    <div className="grid grid-3">
                        {['Food Service', 'Nursing Care', 'Agriculture'].map((p, i) => (
                            <div key={i} className="program-card glass-card fade-in">
                                <div className="program-icon"><Award size={32} /></div>
                                <h3>{p}</h3>
                                <p>Program persiapan kerja untuk bidang {p} di berbagai prefektur Jepang.</p>
                                <a href="#kontak" className="learn-more">Selengkapnya →</a>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {content.galeri?.isVisible && (
                <Section id="galeri" title={content.galeri.title} centered>
                    <div className="grid grid-4 galeri-grid">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="galeri-item glass-card fade-in">
                                <div className="galeri-placeholder">Image {i}</div>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {content.blog?.isVisible && (
                <Section id="blog" title={content.blog.title} className="bg-light" centered>
                    <div className="grid grid-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="blog-card glass-card fade-in">
                                <div className="blog-date">7 Feb 2026</div>
                                <h3>Pentingnya Persiapan Mental Sebelum ke Jepang</h3>
                                <p>Mempersiapkan diri secara mental sama pentingnya dengan kemampuan bahasa...</p>
                                <a href="#" className="read-more">Baca Selengkapnya</a>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {content.alumni?.isVisible && (
                <Section id="alumni" title={content.alumni.title} centered>
                    <div className="grid grid-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="testimonial-card glass-card fade-in">
                                <p>"Ayaka Josei Center membantu saya dari nol hingga akhirnya saya bisa bekerja di Tokyo!"</p>
                                <h4>Alumni {i}</h4>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            <style jsx="true">{`
        .bg-light { background: #f8fafc; }
        .feature-list { list-style: none; margin-top: 2rem; }
        .feature-list li { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; font-weight: 500; }
        .stat-card { padding: 2rem; text-align: center; border-radius: 16px; }
        .stat-card h4 { font-size: 2rem; margin: 1rem 0 0.5rem; }
        .program-card { padding: 3rem 2rem; transition: var(--transition); border-radius: 20px; }
        .program-card:hover { transform: translateY(-10px); border-color: var(--accent); }
        .program-icon { color: var(--accent); margin-bottom: 1.5rem; }
        .learn-more { color: var(--accent); font-weight: 600; margin-top: 1.5rem; display: inline-block; }
        .benefit-circle { width: 64px; height: 64px; background: rgba(211, 47, 47, 0.1); color: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .galeri-placeholder { height: 200px; display: flex; align-items: center; justify-content: center; background: #fee2e2; color: var(--accent); border-radius: 12px; font-weight: 600; }
        .blog-card { padding: 2rem; border-radius: 16px; border: 1px solid #fee2e2; }
        .blog-date { font-size: 0.75rem; color: var(--accent); font-weight: 700; margin-bottom: 0.5rem; }
        .read-more { color: var(--accent); font-weight: 600; margin-top: 1rem; display: inline-block; }
        .testimonial-card { padding: 2rem; border-radius: 16px; border-left: 4px solid var(--accent); }
        .testimonial-card h4 { margin-top: 1rem; color: var(--primary); }
      `}</style>
        </div>
    );
};

export default LandingPage;
