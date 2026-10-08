// lib/auth/auth-service.ts
import { createClient } from '@/lib/supabase/server';

export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile() {
  const supabase = createClient();
  const user = await getCurrentUser();
  
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
}

export async function isAdmin() {
  const profile = await getUserProfile();
  return profile?.role === 'admin' || profile?.role === 'super_admin';
}

export async function isSuperAdmin() {
  const profile = await getUserProfile();
  return profile?.role === 'super_admin';
}
