export type UserRole = 'user' | 'admin' | 'super_admin';

export function isAdminRole(role?: string | null): boolean {
  return role === 'admin' || role === 'super_admin';
}

export function isSuperAdminRole(role?: string | null): boolean {
  return role === 'super_admin';
}

export function normalizeRole(role?: string | null): UserRole {
  if (role === 'admin' || role === 'super_admin') return role;
  return 'user';
}
