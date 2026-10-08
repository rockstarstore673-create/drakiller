'use client';

import { useState } from 'react';
import { Upload, Play, Video, Gauge } from 'lucide-react';

export default function VideoEnhancePage() {
  const [status, setStatus] = useState('queued');
  const [progress, setProgress] = useState(42);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Video Enhance</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Drakiller Video</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-panel p-6">
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
              <Video className="mx-auto mb-4 h-12 w-12 text-cyan-400" />
              <p className="text-lg font-medium text-white">Drop your video here</p>
              <p className="mt-2 text-slate-400">MP4, MOV, WEBM, AVI</p>
              <input type="file" accept="video/*" className="mt-6 block w-full text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold">Processing Queue</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Status</span>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-cyan-300">{status}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-sm text-slate-400">Progress: {progress}%</div>
              </div>
            </div>

            <div className="glass-panel p-5">
              <h3 className="font-semibold">Settings</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <label className="flex items-center justify-between"><span>Sharpen</span><input type="checkbox" defaultChecked /></label>
                <label className="flex items-center justify-between"><span>Denoise</span><input type="checkbox" defaultChecked /></label>
                <label className="flex items-center justify-between"><span>Stabilization</span><input type="checkbox" /></label>
              </div>
              <button className="mt-5 w-full btn-primary">
                Start Processing
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
