'use client';

import { useState } from 'react';
import { Search, BookOpenText, Loader2, GitBranch, Star, Github } from 'lucide-react';

type RepoResult = {
  id: number;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
};

export default function GitHubExplorerPage() {
  const [query, setQuery] = useState('vercel/next.js');
  const [results, setResults] = useState<RepoResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/github/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch repositories');
      }
      setResults(data.items || []);
    } catch (err: any) {
      setError(err.message || 'GitHub search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">GitHub Explorer</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Jelajahi repository publik</h1>
        </div>

        <div className="glass-panel p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari repository, user, organisasi..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button onClick={handleSearch} className="btn-primary min-w-[140px]" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-4 text-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          {results.map((repo) => (
            <div key={repo.id} className="glass-panel p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <Github className="h-4 w-4" />
                    <span className="font-semibold">{repo.full_name}</span>
                  </div>
                  <p className="mt-2 text-slate-300">{repo.description || 'Tidak ada deskripsi.'}</p>
                </div>
                <div className="flex gap-2">
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn-secondary text-xs">
                    Open GitHub
                  </a>
                  <a href={`${repo.html_url}/archive/refs/heads/main.zip`} target="_blank" rel="noreferrer" className="btn-primary text-xs">
                    Download ZIP
                  </a>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-400">
                <span className="flex items-center gap-1"><Star className="h-4 w-4" /> {repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitBranch className="h-4 w-4" /> {repo.forks_count}</span>
                <span>{repo.language || 'Unknown'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
