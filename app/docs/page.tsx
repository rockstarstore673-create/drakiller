import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function DocsPage() {
  const docs = [
    'Getting Started',
    'Account',
    'AI Studio',
    'Photo Enhance',
    'Video Enhance',
    'Sticker Maker',
    'Logo Maker',
    'GitHub Explorer',
    'File Manager',
    'Projects',
    'Security',
    'Privacy',
    'FAQ',
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Documentation</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Panduan Drakiller</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {docs.map((doc) => (
            <Link key={doc} href="/dashboard" className="glass-panel flex items-center justify-between p-5 hover:border-blue-500/50">
              <span>{doc}</span>
              <ArrowUpRight className="h-4 w-4 text-blue-400" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
