import { Mail, Phone, MapPin, Clock, Send, Shield, Info, Instagram, Facebook, MessageCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactPage = ({ content }) => {
    const { t } = useTranslation();
    const data = content?.kontak_halaman;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('is-revealed');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.contact-reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [content]);

    if (!data) return <div className="contact-loader">Initializing Concierge...</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apiUrl = `http://${window.location.hostname}:5005/api/communications`;
            await axios.post(apiUrl, formData);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 5000);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Gagal mengirim pesan. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="contact-wrapper">
            {/* 1. CONCIERGE HERO */}
            <header className="contact-hero">
                <div className="hero-bg-accent"></div>
                <div className="contact-container">
                    <div className="hero-flex-lux">
                        <div className="hero-text-lux contact-reveal reveal-left">
                            <span className="contact-tag">{t('contact.channel')}</span>
                            <h1 className="contact-title-lux">
                                {t('contact.partnership').split(' & ')[0]} <br />
                                <span>& {t('contact.partnership').split(' & ')[1]}</span>
                            </h1>
                            <div className="luxury-line"></div>
                            <p className="contact-p-lux">{data.pengantar?.content}</p>
                        </div>
                    </div>
                </div>
            </header>

            <section className="contact-main-grid">
                <div className="contact-container">
                    <div className="split-grid-lux">

                        {/* 2. OFFICIAL INFO SIDE */}
                        <div className="info-side-lux contact-reveal reveal-left">
                            <div className="info-card-lux">
                                <div className="info-header-vangu">
                                    <div className="vangu-dot"></div>
                                    <h2>{t('contact.info_lembaga')}</h2>
                                </div>
                                <div className="info-body-lux">
                                    <div className="info-item-lux">
                                        <div className="icon-box-min"><MapPin size={20} /></div>
                                        <div>
                                            <label>{t('contact.alamat')}</label>
                                            <p>{data.infoUtama?.alamat}</p>
                                        </div>
                                    </div>
                                    <div className="info-item-lux">
                                        <div className="icon-box-min"><MessageCircle size={20} /></div>
                                        <div>
                                            <label>{t('contact.wa')}</label>
                                            <p>{data.infoUtama?.whatsapp}</p>
                                        </div>
                                    </div>
                                    <div className="info-item-lux">
                                        <div className="icon-box-min"><Mail size={20} /></div>
                                        <div>
                                            <label>{t('contact.email')}</label>
                                            <p>{data.infoUtama?.email}</p>
                                        </div>
                                    </div>
                                    <div className="info-item-lux">
                                        <div className="icon-box-min"><Clock size={20} /></div>
                                        <div>
                                            <label>{t('contact.jam')}</label>
                                            <p>{data.infoUtama?.jamOperasional}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="social-mini-grid">
                                    {(data.sosialMedia || []).map((social, idx) => (
                                        <a href={social.link} key={idx} className="social-link-lux" target="_blank" rel="noopener noreferrer">
                                            {social.platform === 'Instagram' ? <Instagram size={18} /> : <Facebook size={18} />}
                                            <span>{social.handle}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* 4. PURPOSE & 5. PRIVACY BLOCKS */}
                            <div className="transparency-stack">
                                <div className="trust-card-min">
                                    <div className="trust-icon"><Info size={20} /></div>
                                    <div className="trust-text">
                                        <h4>{data.tujuanPesan?.title}</h4>
                                        <p>{data.tujuanPesan?.content}</p>
                                    </div>
                                </div>
                                <div className="trust-card-min alt">
                                    <div className="trust-icon"><Shield size={20} /></div>
                                    <div className="trust-text">
                                        <h4>{data.privasi?.title}</h4>
                                        <p>{data.privasi?.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. INTERACTIVE FORM SIDE */}
                        <div className="form-side-lux contact-reveal reveal-right">
                            <div className="form-box-lux">
                                <div className="form-header-lux">
                                    <h3>{t('contact.kirim_pesan')}</h3>
                                    <p>{t('contact.respon_time')}</p>
                                </div>

                                <form onSubmit={handleSubmit} className="vangu-form">
                                    <div className="input-group-lux">
                                        <label>{t('contact.nama_lengkap')}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder={t('contact.placeholder_nama')}
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-grid-min">
                                        <div className="input-group-lux">
                                            <label>{t('contact.email_kontak')}</label>
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder={t('contact.placeholder_email')}
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-group-lux">
                                            <label>{t('contact.subjek')}</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">{t('contact.pilih_subjek')}</option>
                                                <option value="konsultasi">{t('contact.subjek_konsul')}</option>
                                                <option value="pendaftaran">{t('contact.subjek_daftar')}</option>
                                                <option value="umum">{t('contact.subjek_umum')}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="input-group-lux">
                                        <label>{t('contact.pesan')}</label>
                                        <textarea
                                            name="message"
                                            rows="5"
                                            placeholder={t('contact.placeholder_pesan')}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className={`submit-btn-lux ${isSubmitted ? 'is-success' : ''}`}>
                                        {isSubmitted ? (
                                            <><CheckCircle2 size={20} /> {t('btn.terkirim')}</>
                                        ) : (
                                            <><Send size={18} /> {t('btn.kirim')}</>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. PENUTUP */}
            <footer className="contact-footer contact-reveal reveal-up">
                <div className="contact-container">
                    <div className="footer-vangu-inner">
                        <div className="footer-line-v"></div>
                        <h2 className="footer-h2-lux">{data.penutup?.content}</h2>
                        <div className="footer-meta-vangu">
                            <span>OFFICIAL COORDINATION HUB</span>
                            <span className="v-dot"></span>
                            <span>VERSION 2026.1</span>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx="true">{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Playfair+Display:ital,wght@1,900&display=swap');

                .contact-wrapper {
                    --co-red: #da291c;
                    --co-dark: #0f172a;
                    --co-grey: #64748b;
                    --co-soft: #f8fafc;
                    background: #fff;
                    color: var(--co-dark);
                }

                .contact-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

                /* REVEAL SYSTEM */
                .contact-reveal { opacity: 0; transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
                .reveal-up { transform: translateY(60px); }
                .reveal-left { transform: translateX(-60px); }
                .reveal-right { transform: translateX(60px); }
                .is-revealed { opacity: 1; transform: translate(0, 0); }

                /* HERO */
                .contact-hero { min-height: 50vh; display: flex; align-items: center; background: #fff; position: relative; padding-top: 120px; }
                .hero-bg-accent { position: absolute; top: 0; right: 0; width: 40%; height: 100%; background: var(--co-soft); z-index: 1; }
                .hero-flex-lux { position: relative; z-index: 10; }
                
                .contact-tag { font-weight: 900; letter-spacing: 4px; color: var(--co-red); font-size: 0.8rem; margin-bottom: 2rem; display: block; }
                .contact-title-lux {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(2.5rem, 8vw, 6rem);
                    font-weight: 900;
                    line-height: 0.9;
                    letter-spacing: -4px;
                    margin-bottom: 2.5rem;
                    word-break: break-word;
                    max-width: 100%;
                }
                .contact-title-lux span { font-family: 'Playfair Display', serif; font-style: italic; color: transparent; -webkit-text-stroke: 1.5px var(--co-dark); }
                
                .luxury-line { width: 80px; height: 6px; background: var(--co-red); margin-bottom: 3rem; }
                .contact-p-lux { font-size: 1.4rem; color: var(--co-grey); line-height: 1.5; max-width: 600px; }

                /* MAIN GRID */
                .contact-main-grid { border-top: 1px solid #f1f5f9; padding: clamp(4rem, 8vw, 8rem) 0; }
                .split-grid-lux { display: grid; grid-template-columns: 1fr 1.2fr; gap: 6rem; align-items: start; }

                /* INFO SIDE */
                .info-card-lux { background: var(--co-dark); color: white; padding: 5rem; border-radius: 40px; margin-bottom: 4rem; position: relative; overflow: hidden; }
                .vangu-dot { width: 12px; height: 12px; background: var(--co-red); border-radius: 50%; margin-bottom: 1.5rem; }
                .info-header-vangu h2 { font-size: 2rem; font-weight: 900; margin-bottom: 4rem; letter-spacing: -1px; }

                .info-body-lux { display: flex; flex-direction: column; gap: 3rem; margin-bottom: 5rem; }
                .info-item-lux { display: flex; gap: 2rem; align-items: flex-start; }
                .icon-box-min { width: 50px; height: 50px; background: rgba(255,255,255,0.05); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--co-red); border: 1px solid rgba(255,255,255,0.1); }
                
                .info-item-lux label { display: block; font-size: 0.75rem; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; }
                .info-item-lux p { font-size: 1.1rem; font-weight: 700; line-height: 1.4; color: white; }

                .social-mini-grid { display: flex; gap: 1rem; flex-wrap: wrap; }
                .social-link-lux { 
                    padding: 1rem 1.5rem; background: white; color: var(--co-dark); border-radius: 100px;
                    display: flex; align-items: center; gap: 1rem; font-weight: 900; font-size: 0.8rem; text-decoration: none;
                    transition: 0.3s;
                }
                .social-link-lux:hover { background: var(--co-red); color: white; transform: translateY(-5px); }

                .transparency-stack { display: flex; flex-direction: column; gap: 2rem; }
                .trust-card-min { 
                    display: grid; grid-template-columns: 50px 1fr; gap: 2rem; 
                    padding: 2.5rem; background: var(--co-soft); border-radius: 24px; border: 1px solid #e2e8f0; 
                }
                .trust-icon { color: var(--co-red); }
                .trust-text h4 { font-size: 1.1rem; font-weight: 900; margin-bottom: 0.5rem; }
                .trust-text p { font-size: 0.9rem; color: var(--co-grey); line-height: 1.6; }

                /* FORM SIDE */
                .form-box-lux { background: #fff; border: 1px solid #f1f5f9; padding: clamp(2rem, 6vw, 6rem); border-radius: 40px; box-shadow: 0 40px 100px rgba(0,0,0,0.03); }
                .form-header-lux { margin-bottom: 4rem; }
                .form-header-lux h3 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; letter-spacing: -1px; }
                .form-header-lux p { color: var(--co-grey); font-weight: 500; font-size: 1.1rem; }

                .vangu-form { display: flex; flex-direction: column; gap: 2.5rem; }
                .input-group-lux { display: flex; flex-direction: column; gap: 1rem; }
                .input-group-lux label { font-size: 0.8rem; font-weight: 900; color: var(--co-dark); letter-spacing: 1px; text-transform: uppercase; }
                
                .input-group-lux input, .input-group-lux select, .input-group-lux textarea {
                    padding: 1.2rem 1.5rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
                    font-size: 1rem; font-family: inherit; font-weight: 600; outline: none; transition: 0.3s;
                }
                .input-group-lux input:focus, .input-group-lux select:focus, .input-group-lux textarea:focus {
                    background: #fff; border-color: var(--co-red); box-shadow: 0 0 0 4px rgba(218,41,28,0.05);
                }

                .input-grid-min { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

                .submit-btn-lux {
                    padding: 1.8rem; background: var(--co-dark); color: white; border: none; border-radius: 12px;
                    font-weight: 900; font-size: 0.9rem; letter-spacing: 3px; cursor: pointer;
                    display: flex; align-items: center; justify-content: center; gap: 1.5rem; transition: 0.4s;
                }
                .submit-btn-lux:hover { background: var(--co-red); transform: translateY(-3px); }
                .submit-btn-lux.is-success { background: #166534; }

                /* FOOTER */
                .contact-footer { padding: 10rem 0; text-align: center; }
                .footer-line-v { width: 1px; height: 100px; background: #e2e8f0; margin: 0 auto 4rem; }
                .footer-h2-lux { font-size: 3rem; font-weight: 900; letter-spacing: -2px; line-height: 1.1; margin-bottom: 4rem; max-width: 800px; margin-left: auto; margin-right: auto; }
                .footer-meta-vangu { display: flex; align-items: center; justify-content: center; gap: 2rem; opacity: 0.3; font-weight: 900; font-size: 0.7rem; letter-spacing: 5px; }
                .v-dot { width: 4px; height: 4px; background: var(--co-dark); border-radius: 50%; }

                @media (max-width: 1024px) {
                    .contact-container { padding: 0 2rem; }
                    .split-grid-lux { grid-template-columns: 1fr; gap: 4rem; }
                    .info-card-lux { padding: 3rem 2rem; }
                    .form-box-lux { padding: 4rem 2rem; }
                    .input-grid-min { grid-template-columns: 1fr; }
                    .contact-title-lux { font-size: 4rem; letter-spacing: -2px; }
                    .hero-bg-accent { display: none; }
                }

                .contact-loader { height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 2rem; letter-spacing: 5px; color: var(--co-dark); }
            `}</style>
        </div>
    );
};

export default ContactPage;
