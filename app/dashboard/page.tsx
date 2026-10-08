'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LogOut, User, Settings, FileText, Heart, Clock, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({ images: 0, videos: 0, ai_chats: 0, storage: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/auth/login');
          return;
        }

        setUser(user);

        // Load profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }

        // Load stats
        const { count: imageCount } = await supabase
          .from('processing_jobs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('tool_type', 'photo_enhance');

        const { count: videoCount } = await supabase
          .from('processing_jobs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('tool_type', 'video_enhance');

        const { count: aiCount } = await supabase
          .from('ai_conversations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        setStats({
          images: imageCount || 0,
          videos: videoCount || 0,
          ai_chats: aiCount || 0,
          storage: 0,
        });
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-300">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Selamat datang, {profile?.display_name}! 👋
              </h1>
              <p className="text-slate-400">Kelola project dan asset Anda di sini</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => router.push('/account/profile')}
                className="btn-secondary flex-1 sm:flex-none flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary flex-1 sm:flex-none flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Foto Diproses', value: stats.images, icon: '📸' },
              { label: 'Video Diproses', value: stats.videos, icon: '🎬' },
              { label: 'AI Chats', value: stats.ai_chats, icon: '💬' },
              { label: 'Storage', value: `${stats.storage} MB`, icon: '💾' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 space-y-2">
                <p className="text-2xl">{stat.icon}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="glass-panel p-8 space-y-6">
            <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Photo Enhance', href: '/tools/photo-enhance', icon: '📸' },
                { label: 'Video Enhance', href: '/tools/video-enhance', icon: '🎬' },
                { label: 'AI Studio', href: '/tools/ai-studio', icon: '🤖' },
                { label: 'GitHub', href: '/tools/github-explorer', icon: '🐙' },
                { label: 'Sticker Maker', href: '/tools/sticker-maker', icon: '✨' },
                { label: 'Logo Maker', href: '/tools/logo-maker', icon: '🎨' },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => router.push(action.href)}
                  className="glass-panel p-4 text-center hover:border-blue-500/50 transition space-y-2"
                >
                  <p className="text-3xl">{action.icon}</p>
                  <p className="text-xs font-medium text-slate-300">{action.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-panel p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Projects
              </h3>
              <p className="text-slate-400 text-sm">Belum ada project. Mulai buat sekarang!</p>
            </div>
            <div className="glass-panel p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Favorites
              </h3>
              <p className="text-slate-400 text-sm">Belum ada favorit yang disimpan</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
