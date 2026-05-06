/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Book, Image as ImageIcon, MapPin, Heart, Info, User, Settings, Lock } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'Beranda', path: '/', icon: ImageIcon },
  { name: 'Katalog', path: '/katalog', icon: Book },
  { name: 'Blog', path: '/blog', icon: Search },
  { name: 'Buku Tamu', path: '/buku-tamu', icon: User },
  { name: 'Profil', path: '/profil', icon: Info },
  { name: 'Kontak', path: '/kontak', icon: MapPin },
  { name: 'Donasi', path: '/donasi', icon: Heart },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg-base font-sans text-text-main">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-bg-base/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-start group">
              <span className="font-serif text-xl font-bold leading-tight tracking-tighter text-primary uppercase">
                Galeri Manuskrip Sampurnan
              </span>
              <div className="h-0.5 w-8 bg-secondary transition-all group-hover:w-12 mt-1" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all",
                      isActive 
                        ? "text-primary bg-white shadow-sm ring-1 ring-border" 
                        : "text-secondary hover:text-primary hover:bg-white/50"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="h-6 w-px bg-border mx-4" />
              
              <Link
                to="/admin"
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-xl shadow-primary/10 hover:brightness-110 transition-all"
              >
                <Lock size={12} />
                <span>Admin</span>
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-24 z-40 lg:hidden bg-white border-b border-border shadow-2xl"
          >
            <div className="px-4 py-8 space-y-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                      isActive ? "bg-bg-sidebar text-primary" : "text-secondary"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between w-full px-4 py-4 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest"
              >
                Admin Panel <Lock size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-bg-sidebar border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-border/50 pb-12 mb-8">
            <div className="text-center md:text-left">
              <h2 className="font-serif text-2xl font-bold text-primary mb-2">Sampurnan Library</h2>
              <p className="text-secondary text-xs uppercase tracking-[0.3em]">Museum & Repositori Digital Manuskrip Nusantara</p>
            </div>
            <div className="flex gap-8">
              {['Instagram', 'Youtube', 'Facebook'].map(social => (
                <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">{social}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/60">
            <div className="font-sans">© 2024 Galeri Manuskrip Sampurnan. Hak Cipta Dilindungi.</div>
            <div className="flex gap-6 font-sans">
              <span>v1.1.0-stable</span>
              <span>Gresik, Jawa Timur, Indonesia</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
