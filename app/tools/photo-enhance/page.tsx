'use client';

import { useState } from 'react';
import { Upload, Sparkles, Image as ImageIcon, SlidersHorizontal, Download } from 'lucide-react';

export default function PhotoEnhancePage() {
  const [fileName, setFileName] = useState('');
  const [mode, setMode] = useState('2x Upscale');

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Photo Enhance</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Drakiller Enhance</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-panel p-6">
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
              <Upload className="mx-auto mb-4 h-12 w-12 text-blue-400" />
              <p className="text-lg font-medium text-white">Drop your image here</p>
              <p className="mt-2 text-slate-400">JPG, JPEG, PNG, WebP</p>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="mt-6 block w-full text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              />
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span>{fileName || 'Belum ada file dipilih'}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-5">
              <h2 className="mb-4 text-lg font-semibold">Enhancement Options</h2>
              <div className="space-y-3">
                {['2x Upscale', '4x Upscale', 'Sharpen', 'Denoise', 'Deblur', 'Color Enhancement'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setMode(option)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left ${mode === option ? 'border-blue-500 bg-blue-500/10 text-blue-300' : 'border-slate-700 bg-slate-900/40 text-slate-300'}`}
                  >
                    <span>{option}</span>
                    <SlidersHorizontal className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Selected mode</h3>
                <span className="text-blue-400">{mode}</span>
              </div>
              <button className="mt-5 w-full btn-primary">
                Start Enhancement
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
