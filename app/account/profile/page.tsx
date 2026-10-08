'use client';

import Link from 'next/link';
import { FileText, Lock, UserRound, Heart, History, Bell, BookOpen } from 'lucide-react';

const accountLinks = [
  { title: 'Profile', href: '/account/profile', icon: UserRound },
  { title: 'Settings', href: '/settings', icon: Lock },
  { title: 'Privacy Center', href: '/legal/privacy', icon: Heart },
  { title: 'History', href: '/dashboard', icon: History },
  { title: 'Notifications', href: '/dashboard', icon: Bell },
  { title: 'Documentation', href: '/docs', icon: BookOpen },
];

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Account</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Pengaturan akun</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accountLinks.map(({ title, href, icon: Icon }) => (
            <Link key={title} href={href} className="glass-panel p-6 hover:border-blue-500/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">{title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
