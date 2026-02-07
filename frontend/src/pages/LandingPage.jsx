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
        .landing-page {
          background: var(--surface);
          color: var(--foreground);
        }
        
        .about-grid { gap: 4rem; align-items: center; }
        .about-text p { font-size: 1.15rem; line-height: 1.8; color: var(--secondary); margin-bottom: 2rem; }
        
        .feature-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .feature-list li { display: flex; align-items: center; gap: 1rem; font-weight: 600; color: var(--foreground); }
        
        .stat-card { 
          padding: 2.5rem; 
          text-align: center; 
          border-radius: 24px; 
          background: white;
          box-shadow: var(--shadow-md);
          transition: transform 0.3s ease;
        }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-card h4 { font-size: 2.5rem; color: var(--brand-red); margin: 1rem 0 0.5rem; }
        .stat-card p { font-weight: 700; color: var(--secondary); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; }

        .program-card {
          padding: 3rem 2rem;
          background: white;
          border-radius: 24px;
          border: 1px solid rgba(218, 41, 28, 0.05);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .program-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(218, 41, 28, 0.1);
        }
        .program-icon { width: 64px; height: 64px; background: rgba(218, 41, 28, 0.05); color: var(--brand-red); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; }
        .program-card h3 { font-size: 1.5rem; margin-bottom: 1rem; color: var(--foreground); }
        .program-card p { color: var(--secondary); line-height: 1.6; flex: 1; }
        .learn-more { margin-top: 2rem; color: var(--brand-red); font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }

        .galeri-grid { gap: 1.5rem; }
        .galeri-item { 
          aspect-ratio: 4/3; 
          border-radius: 20px; 
          overflow: hidden; 
          background: #eee;
          position: relative;
        }
        .galeri-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(45deg, #f8fafc, #f1f5f9);
          color: var(--secondary);
          font-weight: 600;
        }

        .blog-card {
          padding: 0;
          overflow: hidden;
          background: white;
          border-radius: 24px;
          box-shadow: var(--shadow-md);
        }
        .blog-image { height: 200px; background: #f1f5f9; }
        .blog-content { padding: 2rem; }
        .blog-date { color: var(--brand-red); font-weight: 700; font-size: 0.8rem; margin-bottom: 0.75rem; display: block; }
        .blog-card h3 { font-size: 1.25rem; margin-bottom: 1rem; line-height: 1.4; }
        .read-more { color: var(--brand-red); font-weight: 800; text-decoration: none; }

        .testimonial-card {
          padding: 3rem;
          background: white;
          border-radius: 24px;
          border-left: 6px solid var(--brand-red);
          box-shadow: var(--shadow-md);
        }
        .testimonial-card p { font-style: italic; font-size: 1.1rem; line-height: 1.7; color: var(--foreground); }
        .testimonial-details { margin-top: 2rem; }
        .testimonial-details h4 { font-size: 1rem; margin-bottom: 0.25rem; }
        .testimonial-details span { font-size: 0.8rem; color: var(--secondary); }

        .bg-light { background: white; }
      `}</style>
        </div>
    );
};

export default LandingPage;
