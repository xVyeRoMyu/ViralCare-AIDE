
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-slide-in');
    } else {
      setAnimationClass('animate-slide-out');
    }
  }, [isOpen]);

  return (
    <div 
      className={`fixed top-0 left-0 h-full w-60 bg-sidebar shadow-lg z-30 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${animationClass}`}
    >
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-sidebar-foreground">Menu</h2>
          <button 
            onClick={onClose}
            className="text-sidebar-foreground hover:text-sidebar-primary text-2xl"
          >
            ✖️
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link 
                to="/" 
                className="flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
                onClick={onClose}
              >
                <span className="mr-3">🏠</span> Beranda
              </Link>
            </li>
            <li>
              <Link 
                to="/tentang" 
                className="flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
                onClick={onClose}
              >
                <span className="mr-3">ℹ️</span> Tentang
              </Link>
            </li>
            <li>
              <Link 
                to="/penyakit" 
                className="flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
                onClick={onClose}
              >
                <span className="mr-3">🦠</span> Info Penyakit
              </Link>
            </li>
            <li>
              <Link 
                to="/pencegahan"
                className="flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
                onClick={onClose}
              >
                <span className="mr-3">🛡️</span> Pencegahan
              </Link>
            </li>
            <li>
              <Link 
                to="/konsultasi" 
                className="flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
                onClick={onClose}
              >
                <span className="mr-3">💬</span> Konsultasi
              </Link>
            </li>
            <li>
              <Link 
                to="/kontak" 
                className="flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
                onClick={onClose}
              >
                <span className="mr-3">📞</span> Kontak
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
