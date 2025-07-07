import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string; // Add optional title prop
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container max-w-7xl px-4 sm:px-6 pb-16">
        {title && <h1 className="text-3xl font-bold mb-8 mt-4 text-center">{title}</h1>}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
