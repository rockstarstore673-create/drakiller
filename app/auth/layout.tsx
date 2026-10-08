// app/auth/layout.tsx
'use client';

import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 -z-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      {children}
    </div>
  );
}
