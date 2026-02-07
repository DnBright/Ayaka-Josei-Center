import React from 'react';
import { Shield, Award, Users, Sparkles } from 'lucide-react';

const FragmentedValues = ({ items }) => {
    const icons = [<Shield />, <Award />, <Users />, <Sparkles />];

    return (
        <div className="fragmented-container">
            {items.map((val, idx) => (
                <div key={idx} className={`value-fragment frag-${idx + 1} page-reveal reveal-up`}>
                    <div className="frag-icon-wrap">{icons[idx % icons.length]}</div>
                    <div className="frag-content">
                        <h3>{val.label}</h3>
                        <p>{val.desc}</p>
                    </div>
                </div>
            ))}

            <style jsx="true">{`
                .fragmented-container {
                    position: relative;
                    height: 800px;
                    margin: 5rem 0;
                }
                .value-fragment {
                    position: absolute;
                    background: white;
                    padding: 2.5rem;
                    border-radius: 30px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.05);
                    border: 1px solid #f1f5f9;
                    max-width: 320px;
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .value-fragment:hover {
                    transform: translateY(-15px) scale(1.05);
                    border-color: #da291c;
                    z-index: 10;
                }
                .frag-icon-wrap {
                    color: #da291c;
                    margin-bottom: 1.5rem;
                }
                .frag-content h3 {
                    font-size: clamp(1.2rem, 5vw, 1.5rem);
                    font-weight: 900;
                    margin-bottom: 0.75rem;
                }
                .frag-content p {
                    font-size: clamp(0.85rem, 3vw, 0.95rem);
                    color: #64748b;
                    line-height: 1.5;
                }

                /* Fragment Positioning - Asymmetric Drift */
                .frag-1 { top: 10%; left: 5%; transform: rotate(-2deg); }
                .frag-2 { top: 45%; left: 40%; transform: rotate(3deg); }
                .frag-3 { top: 15%; right: 5%; transform: rotate(1deg); }
                .frag-4 { bottom: 10%; right: 15%; transform: rotate(-3deg); }

                @media (max-width: 1024px) {
                    .fragmented-container { height: auto; display: flex; flex-direction: column; gap: 2rem; margin: 3rem 0; padding: 0 5%; }
                    .value-fragment { position: relative; inset: 0 !important; transform: none !important; max-width: 100%; padding: 2rem; }
                    .frag-icon-wrap { margin-bottom: 1rem; }
                }

                @media (max-width: 640px) {
                    .value-fragment { padding: 1.5rem; border-radius: 20px; }
                }
            `}</style>
        </div>
    );
};

export default FragmentedValues;
