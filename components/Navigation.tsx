'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-700/50 bg-slate-950/80 backdrop-blur-xl">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-blue-400 transition">
            <span className="text-2xl">⚡</span>
            <span>DRAKILLER</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/tools" className="text-slate-300 hover:text-white transition">Tools</Link>
            <Link href="/docs" className="text-slate-300 hover:text-white transition">Dokumentasi</Link>
            <Link href="/legal/privacy" className="text-slate-300 hover:text-white transition">Privacy</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login" className="text-slate-300 hover:text-white transition px-4 py-2">
              Masuk
            </Link>
            <Link href="/auth/signup" className="btn-primary">
              Daftar
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-700/50 mt-4 pt-4 space-y-4">
            <Link href="/tools" className="block text-slate-300 hover:text-white transition py-2">Tools</Link>
            <Link href="/docs" className="block text-slate-300 hover:text-white transition py-2">Dokumentasi</Link>
            <Link href="/legal/privacy" className="block text-slate-300 hover:text-white transition py-2">Privacy</Link>
            <div className="flex gap-2 pt-4">
              <Link href="/auth/login" className="flex-1 btn-secondary text-center">Masuk</Link>
              <Link href="/auth/signup" className="flex-1 btn-primary text-center">Daftar</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
