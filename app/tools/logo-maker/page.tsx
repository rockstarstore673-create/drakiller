'use client';

import { Download, Shield, Sparkles } from 'lucide-react';

export default function LogoMakerPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-400">Logo Studio</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Drakiller Logo Maker</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel p-6 text-center">
            <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/60">
              <div className="space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-3xl text-amber-300">D</div>
                <p className="text-slate-300">Logo preview</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-5">
            <h2 className="text-lg font-semibold">Style Controls</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {['Gaming', 'Esports', 'Cyber', 'Developer', 'Technology'].map((style) => (
                <button key={style} className="block w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-left">{style}</button>
              ))}
            </div>
            <button className="mt-5 w-full btn-primary">
              <Download className="mr-2 h-4 w-4" /> Export HD
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
