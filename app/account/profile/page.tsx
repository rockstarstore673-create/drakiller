'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, BookOpen, FileText, Heart, History, Lock, UserRound } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AccountPage() {
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setEmail(user.email || '');

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(data);
    };

    loadProfile();
  }, []);

  const accountLinks = [
    { title: 'Profile', href: '/account/profile', icon: UserRound },
    { title: 'Settings', href: '/settings', icon: Lock },
    { title: 'Privacy Center', href: '/legal/privacy', icon: Heart },
    { title: 'History', href: '/dashboard', icon: History },
    { title: 'Notifications', href: '/dashboard', icon: Bell },
    { title: 'Documentation', href: '/docs', icon: BookOpen },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Account</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Pengaturan akun</h1>
        </div>

        <div className="glass-panel p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-400">Akun</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{profile?.display_name || 'User'}</h2>
              <p className="mt-1 text-slate-300">{email || 'No email available'}</p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
              Role: {profile?.role || 'user'}
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accountLinks.map(({ title, href, icon: Icon }) => (
            <Link key={title} href={href} className="glass-panel p-6 transition hover:border-blue-500/50">
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
