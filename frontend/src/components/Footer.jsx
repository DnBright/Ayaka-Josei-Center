import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ content }) => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <h3>Ayaka Josei Center</h3>
                    <p>Membantu mewujudkan karir profesional Anda di Jepang dengan aman dan terpercaya.</p>
                </div>
                <div className="footer-links">
                    <h4>Navigasi</h4>
                    <ul>
                        <li><a href="#about">Tentang Kami</a></li>
                        <li><a href="#programs">Program</a></li>
                        <li><a href="#benefits">Benefit</a></li>
                        <li><a href="#testimonials">Testimoni</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h4>Kontak Kami</h4>
                    <div className="contact-item">
                        <Mail size={18} />
                        <span>{content?.email || 'admin@ayaka.com'}</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} />
                        <span>{content?.phone || '+62 812 3456 7890'}</span>
                    </div>
                    <div className="contact-item">
                        <MapPin size={18} />
                        <span>Jakarta, Indonesia</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom text-center">
                <p>&copy; {new Date().getFullYear()} Ayaka Josei Center. All rights reserved.</p>
            </div>

            <style jsx="true">{`
        .footer {
          background: var(--primary);
          color: white;
          padding: 6rem 0 2rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr; }
        }
        h3, h4 { color: white; margin-bottom: 1.5rem; }
        p { color: #94a3b8; }
        ul { list-style: none; }
        ul li { margin-bottom: 0.75rem; }
        ul li a { color: #94a3b8; }
        ul li a:hover { color: var(--accent-light); }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #94a3b8;
          margin-bottom: 1rem;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
          color: #64748b;
          font-size: 0.875rem;
        }
        .text-center { text-align: center; }
      `}</style>
        </footer>
    );
};

export default Footer;
