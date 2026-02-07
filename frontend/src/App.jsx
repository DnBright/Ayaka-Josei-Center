import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

const API_URL = 'http://localhost:5001/api';

function App() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const resp = await axios.get(`${API_URL}/content`);
      setContent(resp.data);
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading Ayaka Josei Center...</div>;

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage content={content} />} />
            <Route path="/admin" element={<AdminDashboard content={content} refreshContent={fetchContent} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer content={content?.contact} />
      </div>
    </Router>
  );
}

export default App;
