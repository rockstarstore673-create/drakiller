'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Users, Cpu, Gauge, BarChart3 } from 'lucide-react';

const adminStats = [
  { label: 'Pengguna aktif', value: '12.4K' },
  { label: 'AI requests', value: '84.2K' },
  { label: 'Processing jobs', value: '1.9K' },
  { label: 'Storage used', value: '426 GB' },
];

const modules = [
  { title: 'Users', description: 'Kelola pengguna, status, dan role.' },
  { title: 'System', description: 'Monitoring health, jobs, storage, API.' },
  { title: 'AI', description: 'Provider config, model usage, rate limiting.' },
  { title: 'GitHub', description: 'Rate limit, repo API, search monitoring.' },
  { title: 'Tools', description: 'Enable/disable feature, maintenance mode.' },
  { title: 'Security', description: 'Audit logs dan laporan abuse.' },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Admin Panel</p>
            <h1 className="mt-3 text-4xl font-bold text-white">DRAKILLER Control Center</h1>
          </div>
          <Link href="/dashboard" className="btn-primary">
            Kembali ke Dashboard
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {adminStats.map((stat) => (
            <div key={stat.label} className="glass-panel p-5">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((item) => (
            <div key={item.title} className="glass-panel p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                {item.title === 'Users' ? <Users className="h-5 w-5" /> : item.title === 'System' ? <Gauge className="h-5 w-5" /> : item.title === 'AI' ? <Cpu className="h-5 w-5" /> : item.title === 'GitHub' ? <BarChart3 className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
              </div>
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-slate-400">{item.description}</p>
              <Link href="/dashboard" className="mt-5 inline-flex items-center text-blue-400 hover:text-blue-300">
                Open <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
