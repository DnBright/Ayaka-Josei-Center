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
          padding: 12rem 0 8rem;
          background: radial-gradient(circle at 10% 20%, rgba(211, 47, 47, 0.05) 0%, rgba(255, 255, 255, 1) 90%);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width: 992px) {
          .hero-grid { grid-template-columns: 1fr 1fr; }
        }
        .badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(211, 47, 47, 0.1);
          color: var(--primary);
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }
        h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 1.5rem;
          color: var(--primary);
        }
        p {
          font-size: 1.25rem;
          color: var(--secondary);
          margin-bottom: 2.5rem;
          max-width: 600px;
        }
        .hero-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          text-align: center;
        }
        .btn-primary {
          background: var(--accent);
          color: white;
          box-shadow: 0 10px 20px rgba(211, 47, 47, 0.2);
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(211, 47, 47, 0.3);
        }
        .btn-secondary {
          background: white;
          border: 1px solid #e2e8f0;
          color: var(--primary);
        }
        .hero-image {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .image-blob {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 40px rgba(211, 47, 47, 0.2);
        }
        .placeholder-brand {
          font-size: 5rem;
          font-weight: 800;
          color: white;
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
};

export default Hero;
