import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MemberLogin = () => {
    const navigate = useNavigate();
    const location = useLocation() || {}; // Guard
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (location.state?.registrationSuccess) {
            setSuccessMsg(location.state.message);
            // Clear state
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg(''); // Clear success on new attempt

        setTimeout(() => {
            const activeMembers = JSON.parse(localStorage.getItem('active_members') || '[]');
            const pendingMembers = JSON.parse(localStorage.getItem('pending_members') || '[]');

            const user = activeMembers.find(m => m.email === email && m.password === password);
            const pendingUser = pendingMembers.find(m => m.email === email && m.password === password);

            // Allow Hardcoded Demo User
            if (email === 'member@ayaka.com' && password === 'member123') {
                localStorage.setItem('member_token', 'mock-member-token');
                localStorage.setItem('member_user', JSON.stringify({ name: 'Member Ayaka', email }));
                navigate('/ebook');
                return;
            }

            if (user) {
                // Success
                localStorage.setItem('member_token', 'mock-member-token');
                localStorage.setItem('member_user', JSON.stringify(user));
                navigate('/ebook');
            } else if (pendingUser) {
                setError('Akun Anda masih menunggu persetujuan Admin.');
                setLoading(false);
            } else {
                setError('Email atau password salah.');
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="page-wrapper">
            {/* Navbar will be added in App.jsx layout, but sticking to consistent page structure */}

            <section className="login-section">
                <div className="login-container">
                    <div className="login-card-member reveal-up">
                        <div className="brand-header">
                            <img src="/assets/logo ayakan.png" alt="Ayaka Logo" className="brand-logo" />
                            <h2>Member Area</h2>
                            <p>Masuk untuk mengakses materi eksklusif</p>
                        </div>

                        {successMsg && (
                            <div className="alert-success-box">
                                <span className="success-emoji">🎉</span> {successMsg}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="login-form">
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <User size={20} className="input-icon" />
                                    <input
                                        type="email"
                                        placeholder="nama@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <Lock size={20} className="input-icon" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? 'Memproses...' : 'Masuk Sekarang'} <ArrowRight size={20} />
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>Belum menjadi member? <Link to="/member/register">Daftar sekarang</Link></p>
                            <Link to="/" className="back-link">Kembali ke Beranda</Link>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx="true">{`
                .page-wrapper {
                    min-height: 100vh;
                    background: #f8fafc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                .login-container {
                    width: 100%;
                    max-width: 450px;
                }

                .login-card-member {
                    background: white;
                    padding: 3rem;
                    border-radius: 24px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .brand-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .brand-logo {
                    height: 60px;
                    margin-bottom: 1.5rem;
                }

                .brand-header h2 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.8rem;
                    color: #0f172a;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                }

                .brand-header p {
                    color: #64748b;
                    font-size: 0.95rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #334155;
                    margin-bottom: 0.5rem;
                }

                .input-wrapper {
                    position: relative;
                }

                .input-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }

                .input-wrapper input {
                    width: 100%;
                    padding: 1rem 1rem 1rem 3rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 1rem;
                    transition: all 0.3s;
                    outline: none;
                }

                .input-wrapper input:focus {
                    border-color: #da291c;
                    box-shadow: 0 0 0 3px rgba(218, 41, 28, 0.1);
                }

                .btn-submit {
                    width: 100%;
                    padding: 1rem;
                    background: #da291c;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: 0.3s;
                    margin-top: 1rem;
                }

                .btn-submit:hover {
                    background: #b91c1c;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(218, 41, 28, 0.2);
                }

                .btn-submit:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .error-message {
                    background: #fee2e2;
                    color: #b91c1c;
                    padding: 0.75rem;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .alert-success-box {
                    background: #f0fdf4;
                    color: #15803d;
                    padding: 1rem;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    border: 1px solid #bbf7d0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .success-emoji { font-size: 1.2rem; }

                .login-footer {
                    margin-top: 2rem;
                    text-align: center;
                    border-top: 1px solid #f1f5f9;
                    padding-top: 1.5rem;
                }

                .login-footer p {
                    color: #64748b;
                    font-size: 0.95rem;
                    margin-bottom: 0.5rem;
                }

                .login-footer a {
                    color: #da291c;
                    font-weight: 600;
                    text-decoration: none;
                }

                .back-link {
                    display: inline-block;
                    margin-top: 1rem;
                    font-size: 0.9rem;
                    color: #94a3b8 !important;
                }
            `}</style>
        </div>
    );
};

export default MemberLogin;
