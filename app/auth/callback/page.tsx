'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error || !data?.session?.user) {
          router.push('/auth/login?error=Auth failed');
          return;
        }

        // Check if profile exists, if not create it
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();

        if (!profile) {
          // Create profile for OAuth users
          const username = data.session.user.email?.split('@')[0] || 'user';
          await supabase.from('profiles').insert([
            {
              id: data.session.user.id,
              username,
              display_name: data.session.user.user_metadata?.full_name || username,
              email: data.session.user.email!,
              avatar_url: data.session.user.user_metadata?.avatar_url,
              role: 'user',
            },
          ]);
        }

        router.push('/dashboard');
      } catch (error) {
        console.error('Callback error:', error);
        router.push('/auth/login?error=Something went wrong');
      }
    };

    handleCallback();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        <p className="text-slate-300">Sedang memproses login...</p>
      </div>
    </div>
  );
}
