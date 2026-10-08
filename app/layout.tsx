'use client';

import type { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DRAKILLER - AI Creative & Developer Workspace</title>
        <meta name="description" content="Platform AI terintegrasi untuk enhancement foto/video, AI Studio, GitHub explorer, dan creator tools." />
        <meta name="og:title" content="DRAKILLER - AI Creative & Developer Workspace" />
        <meta name="og:description" content="Platform AI terpadu untuk semua kebutuhan kreatif dan developer." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
