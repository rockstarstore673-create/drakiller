'use client';

import { useState } from 'react';
import { ImagePlus, Layers3, Download, Sparkles } from 'lucide-react';

export default function StickerMakerPage() {
  const [stickerName, setStickerName] = useState('Dragon Pack');
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-pink-400">Sticker Studio</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Drakiller Sticker Studio</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="glass-panel p-6">
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
              <ImagePlus className="mx-auto mb-4 h-12 w-12 text-pink-400" />
              <p className="text-lg font-medium text-white">Upload gambar</p>
              <input type="file" accept="image/*" className="mt-6 block w-full text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-pink-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold">Sticker Settings</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <label className="block">
                  <span className="mb-1 block">Pack Name</span>
                  <input value={stickerName} onChange={(e) => setStickerName(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-white" />
                </label>
                <label className="flex items-center justify-between"><span>Transparent BG</span><input type="checkbox" defaultChecked /></label>
                <label className="flex items-center justify-between"><span>Glow</span><input type="checkbox" defaultChecked /></label>
                <label className="flex items-center justify-between"><span>Outline</span><input type="checkbox" defaultChecked /></label>
              </div>
              <button className="mt-5 w-full btn-primary">
                <Download className="mr-2 h-4 w-4" /> Export PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
