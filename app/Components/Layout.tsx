'use client';

import React from 'react';
import Navbar from './Navbar';  // Assuming Navbar is in a separate file

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
      <footer className="bg-black text-white w-full">
        <div className="px-4 py-6 text-center">
          <p className="text-sm">&copy; 2024 Tailored Type. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;