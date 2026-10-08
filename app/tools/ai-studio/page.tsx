'use client';

import { useState } from 'react';
import { Send, Sparkles, Copy, RefreshCcw, Square } from 'lucide-react';

export default function AIStudioPage() {
  const [value, setValue] = useState('Jelaskan bagaimana Drakiller bekerja untuk creator dan developer');
  const [answers, setAnswers] = useState<string[]>([
    'Drakiller adalah workspace AI terpadu untuk creative, enhancement, developer tools, dan GitHub exploration.',
  ]);

  const handleAsk = () => {
    setAnswers((prev) => [...prev, value]);
    setValue('');
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-purple-400">AI Studio</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Drakiller AI</h1>
        </div>

        <div className="glass-panel p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {['Explain', 'Rewrite', 'Summarize', 'Translate', 'Generate ideas'].map((item) => (
              <button key={item} className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">{item}</button>
            ))}
          </div>

          <div className="space-y-4">
            {answers.map((answer, i) => (
              <div key={i} className="rounded-2xl border border-slate-700 bg-slate-900/50 p-4 text-slate-200">
                {answer}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={4}
              placeholder="Tulis prompt Anda..."
              className="flex-1 rounded-2xl border border-slate-700 bg-slate-900/60 p-3 text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={handleAsk} className="btn-primary">
              <Send className="mr-2 h-4 w-4" /> Send
            </button>
            <button className="btn-secondary"><RefreshCcw className="mr-2 h-4 w-4" /> Regenerate</button>
            <button className="btn-secondary"><Square className="mr-2 h-4 w-4" /> Stop</button>
          </div>
        </div>
      </div>
    </main>
  );
}
