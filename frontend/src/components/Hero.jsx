import React from 'react';

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content fade-in">
          <span className="badge">Sukses Berkarir di Jepang</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          <div className="hero-btns">
            <a href="#programs" className="btn btn-primary">{data.buttonText}</a>
            <a href="#about" className="btn btn-secondary">Tentang Kami</a>
          </div>
        </div>
        <div className="hero-image fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="image-blob">
            {/* Visual representation - can be an actual image later */}
            <div className="placeholder-brand">AJC</div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .hero-section {
          padding: 14rem 0 10rem;
          background: radial-gradient(circle at 10% 20%, rgba(218, 41, 28, 0.03) 0%, rgba(255, 255, 255, 1) 90%);
          position: relative;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.2fr 0.8fr; }
        }
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.6rem 1.25rem;
          background: rgba(218, 41, 28, 0.08);
          color: var(--brand-red);
          border-radius: 50px;
          font-weight: 800;
          font-size: 0.85rem;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        h1 {
          font-size: clamp(3rem, 6vw, 4.5rem);
          line-height: 1.1;
          font-weight: 900;
          margin-bottom: 2rem;
          color: var(--foreground);
          letter-spacing: -2px;
        }
        p {
          font-size: 1.35rem;
          line-height: 1.6;
          color: var(--secondary);
          margin-bottom: 3.5rem;
          max-width: 650px;
        }
        .hero-btns {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .btn {
          padding: 1.25rem 2.5rem;
          border-radius: 16px;
          font-weight: 800;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary {
          background: var(--brand-red);
          color: white;
          box-shadow: 0 20px 40px -10px rgba(218, 41, 28, 0.3);
        }
        .btn-primary:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px -15px rgba(218, 41, 28, 0.4);
        }
        .btn-secondary {
          background: white;
          border: 1px solid #e2e8f0;
          color: var(--foreground);
        }
        .btn-secondary:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .hero-image {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .image-blob {
          width: 450px;
          height: 450px;
          background: linear-gradient(135deg, var(--brand-red) 0%, var(--accent) 100%);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 40px 80px -20px rgba(218, 41, 28, 0.3);
        }
        .placeholder-brand {
          font-size: 6rem;
          font-weight: 900;
          color: white;
          letter-spacing: -5px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
