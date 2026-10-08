// lib/auth-service.ts
import { createClient } from '@/lib/supabase/server';

export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile() {
  const supabase = createClient();
  const user = await getCurrentUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

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

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    throw new Error('Forbidden');
  }
  return user;
}
