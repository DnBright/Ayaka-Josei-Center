import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar'; // Kept for now if PublicLayout needs it, but App.jsx might not
import Footer from './components/Footer'; // Kept for now
import PublicLayout from './layouts/PublicLayout';
import LandingPage from './pages/LandingPage';
// import AdminDashboard from './pages/AdminDashboard'; // Deprecated
import AdminLayout from './layouts/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import PageManager from './pages/admin/PageManager';
import HomeEditor from './pages/admin/editors/HomeEditor';
import AboutEditor from './pages/admin/editors/AboutEditor';
import ProgramEditor from './pages/admin/editors/ProgramEditor';
import GalleryEditor from './pages/admin/editors/GalleryEditor';
import BlogEditor from './pages/admin/editors/BlogEditor';
import AlumniEditor from './pages/admin/editors/AlumniEditor';
import ContactEditor from './pages/admin/editors/ContactEditor';
import MediaManager from './pages/admin/MediaManager';
import Communication from './pages/admin/Communication';
import UserManager from './pages/admin/UserManager';
import Settings from './pages/admin/Settings';
import Login from './pages/Login';
import ProfilPage from './pages/ProfilPage';
import ProgramPage from './pages/ProgramPage';
import GaleriPage from './pages/GaleriPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AlumniPage from './pages/AlumniPage';
import ContactPage from './pages/ContactPage';
import SplashLoader from './components/SplashLoader';

// AUTHOR / CMS PAGES
import ArticleManager from './pages/admin/ArticleManager';
import ArticleEditor from './pages/admin/ArticleEditor';
import EBookManager from './pages/admin/EBookManager';
import AuthorProfile from './pages/admin/AuthorProfile';

// MEMBER PAGES
import MemberLogin from './pages/MemberLogin';
import MemberRegister from './pages/MemberRegister';
import EBookPage from './pages/EBookPage';

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
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout content={content} />}>
            <Route path="/" element={<LandingPage content={content} />} />
            <Route path="/profil" element={<ProfilPage content={content} />} />
            <Route path="/program" element={<ProgramPage content={content} />} />
            <Route path="/galeri" element={<GaleriPage content={content} />} />
            <Route path="/blog" element={<BlogPage content={content} />} />
            <Route path="/blog/:slug" element={<BlogDetailPage content={content} />} />
            <Route path="/alumni" element={<AlumniPage content={content} />} />
            <Route path="/kontak" element={<ContactPage content={content} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ebook" element={<EBookPage />} />
          </Route>

          {/* Member Auth Routes */}
          <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/register" element={<MemberRegister />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview content={content} />} />
            <Route path="pages" element={<PageManager />} />
            <Route path="pages/home" element={<HomeEditor content={content} refreshContent={fetchContent} />} />
            <Route path="pages/about" element={<AboutEditor content={content} refreshContent={fetchContent} />} />
            <Route path="pages/program" element={<ProgramEditor content={content} refreshContent={fetchContent} />} />
            <Route path="pages/gallery" element={<GalleryEditor content={content} refreshContent={fetchContent} />} />
            <Route path="pages/blog" element={<BlogEditor content={content} refreshContent={fetchContent} />} />
            <Route path="pages/alumni" element={<AlumniEditor content={content} refreshContent={fetchContent} />} />
            <Route path="pages/contact" element={<ContactEditor content={content} refreshContent={fetchContent} />} />

            {/* Author / Specific Management Routes */}
            <Route path="articles" element={<ArticleManager />} />
            <Route path="articles/new" element={<ArticleEditor />} />
            <Route path="articles/edit/:id" element={<ArticleEditor />} />
            <Route path="ebooks" element={<EBookManager />} />
            <Route path="profile" element={<AuthorProfile />} />

            <Route path="media" element={<MediaManager />} />
            <Route path="communications" element={<Communication />} />
            <Route path="users" element={<UserManager />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
