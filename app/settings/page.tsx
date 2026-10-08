'use client';

import { ShieldCheck, Bell, Palette, Database, Lock } from 'lucide-react';

const settings = [
  { title: 'Profile', desc: 'Username, display name, avatar.' },
  { title: 'Appearance', desc: 'Tema dark, light, cyber blue.' },
  { title: 'Notifications', desc: 'Email, push, processing alerts.' },
  { title: 'Privacy', desc: 'Data retention, deletion settings.' },
  { title: 'Security', desc: 'Sessions, audit logs, access review.' },
  { title: 'Storage', desc: 'Quota, cleanup, downloads.' },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Settings</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Preferensi akun</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {settings.map(({ title, desc }) => (
            <div key={title} className="glass-panel p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                {title === 'Profile' ? <ShieldCheck className="h-5 w-5" /> : title === 'Appearance' ? <Palette className="h-5 w-5" /> : title === 'Notifications' ? <Bell className="h-5 w-5" /> : title === 'Privacy' ? <Lock className="h-5 w-5" /> : title === 'Security' ? <ShieldCheck className="h-5 w-5" /> : <Database className="h-5 w-5" />}
              </div>
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
