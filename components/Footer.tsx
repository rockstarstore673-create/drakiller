'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-950/50 backdrop-blur">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="font-bold text-white text-lg">DRAKILLER</h3>
              <p className="text-slate-400 text-sm">Platform AI terpadu untuk creative dan developer tools.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Produk</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/tools/photo-enhance" className="hover:text-white transition">Photo Enhance</Link></li>
                <li><Link href="/tools/video-enhance" className="hover:text-white transition">Video Enhance</Link></li>
                <li><Link href="/tools/ai-studio" className="hover:text-white transition">AI Studio</Link></li>
                <li><Link href="/tools/github-explorer" className="hover:text-white transition">GitHub Explorer</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Sumber Daya</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/docs" className="hover:text-white transition">Dokumentasi</Link></li>
                <li><Link href="/docs/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="/docs/how-to-use" className="hover:text-white transition">How To Use</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/legal/terms" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/legal/cookies" className="hover:text-white transition">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-sm">
            <p>© 2024 DRAKILLER. All rights reserved.</p>
            <p>Dibuat dengan ❤️ untuk creator dan developer</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
