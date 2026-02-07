import React, { useEffect, useState } from 'react';

const SplashLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsExiting(true), 500);
                    setTimeout(onComplete, 1200); // Handover to App
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15) + 5;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className={`splash-wrapper ${isExiting ? 'exit' : ''}`}>
            <div className="splash-bg">
                <div className="bg-gradient"></div>
                <div className="bg-blobs">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                </div>
            </div>

            <div className="splash-content">
                <div className="logo-container">
                    <svg viewBox="0 0 100 100" className="animated-logo">
                        <circle cx="50" cy="50" r="45" className="logo-circle" />
                        <path d="M30 70 L50 30 L70 70" className="logo-path" />
                        <path d="M40 55 L60 55" className="logo-line" />
                    </svg>
                </div>
                <h1 className="splash-name">AYAKA <span>JOSEI</span> CENTER</h1>
                <div className="loading-meta">
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="percentage-lux">{progress}%</div>
                    <div className="status-text">Mempersiapkan Masa Depan Anda...</div>
                </div>
            </div>

            <style jsx="true">{`
                .splash-wrapper {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #0f172a;
                    overflow: hidden;
                    transition: transform 0.8s cubic-bezier(0.85, 0, 0.15, 1);
                }

                .splash-wrapper.exit {
                    transform: translateY(-100%);
                }

                .splash-bg { position: absolute; inset: 0; z-index: 1; }
                .bg-gradient { 
                    position: absolute; inset: 0; 
                    background: radial-gradient(circle at center, rgba(30, 41, 59, 0.5) 0%, #0f172a 100%);
                }

                .bg-blobs { position: relative; width: 100%; height: 100%; filter: blur(80px); opacity: 0.3; }
                .blob { position: absolute; width: 40vw; height: 40vw; border-radius: 50%; animation: blob-float 20s infinite alternate; }
                .blob-1 { background: #da291c; top: -10%; left: -10%; }
                .blob-2 { background: #1e40af; bottom: -10%; right: -10%; animation-delay: -5s; }

                @keyframes blob-float {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(10vw, 5vw) scale(1.1); }
                    66% { transform: translate(-5vw, 15vw) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); }
                }

                .splash-content {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .logo-container { width: 120px; height: 120px; margin-bottom: 2rem; }
                .animated-logo { width: 100%; height: 100%; }
                .logo-circle {
                    fill: none;
                    stroke: rgba(255,255,255,0.1);
                    stroke-width: 2;
                    stroke-dasharray: 283;
                    stroke-dashoffset: 283;
                    animation: circle-draw 2s forwards;
                }
                .logo-path, .logo-line {
                    fill: none;
                    stroke: #da291c;
                    stroke-width: 3;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-dasharray: 200;
                    stroke-dashoffset: 200;
                    animation: path-draw 1.5s forwards 0.5s;
                }

                @keyframes circle-draw { to { stroke-dashoffset: 0; } }
                @keyframes path-draw { to { stroke-dashoffset: 0; } }

                .splash-name {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 900;
                    letter-spacing: 8px;
                    color: white;
                    margin-bottom: 3rem;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: name-reveal 1s forwards 1s;
                }
                .splash-name span { color: #da291c; }

                @keyframes name-reveal { to { opacity: 1; transform: translateY(0); } }

                .loading-meta { width: 300px; }
                .progress-track {
                    height: 2px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                    margin-bottom: 1rem;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: #da291c;
                    transition: width 0.3s ease-out;
                    box-shadow: 0 0 20px rgba(218, 41, 28, 0.5);
                }

                .percentage-lux { font-family: 'Outfit', sans-serif; font-size: 2.5rem; font-weight: 900; color: white; margin-bottom: 0.5rem; }
                .status-text { font-size: 0.8rem; letter-spacing: 2px; color: rgba(255,255,255,0.5); text-transform: uppercase; font-weight: 700; }
            `}</style>
        </div>
    );
};

export default SplashLoader;
