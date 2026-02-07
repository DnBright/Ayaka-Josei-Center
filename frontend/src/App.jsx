import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ProfilPage from './pages/ProfilPage';
import ProgramPage from './pages/ProgramPage';
import GaleriPage from './pages/GaleriPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AlumniPage from './pages/AlumniPage';
import ContactPage from './pages/ContactPage';
import SplashLoader from './components/SplashLoader';

const API_URL = 'http://localhost:5001/api';

function App() {
  const [content, setContent] = useState(null);
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const resp = await axios.get(`${API_URL}/content`);
      setContent(resp.data);
    } catch (err) {
      console.error('Error fetching content:', err);
    }
  };

  if (!splashFinished) {
    return <SplashLoader onComplete={() => setSplashFinished(true)} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage content={content} />} />
            <Route path="/profil" element={<ProfilPage content={content} />} />
            <Route path="/program" element={<ProgramPage content={content} />} />
            <Route path="/galeri" element={<GaleriPage content={content} />} />
            <Route path="/blog" element={<BlogPage content={content} />} />
            <Route path="/blog/:slug" element={<BlogDetailPage content={content} />} />
            <Route path="/alumni" element={<AlumniPage content={content} />} />
            <Route path="/kontak" element={<ContactPage content={content} />} />
            <Route path="/admin" element={<AdminDashboard content={content} refreshContent={fetchContent} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer content={content?.kontak} />
      </div>
    </Router>
  );
}

export default App;
