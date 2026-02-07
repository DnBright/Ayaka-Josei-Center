import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = ({ content }) => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer content={content?.kontak} />
        </>
    );
};

export default PublicLayout;
