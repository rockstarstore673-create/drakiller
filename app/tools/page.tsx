'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Palette, Github, Video, Image as ImageIcon, FileSearch, Code2 } from 'lucide-react';

const tools = [
  { name: 'AI Studio', description: 'Chat, summarize, rewrite, translate, ideation.', href: '/tools/ai-studio', icon: Sparkles },
  { name: 'Photo Enhance', description: 'Upscale, denoise, sharpen, fix image quality.', href: '/tools/photo-enhance', icon: ImageIcon },
  { name: 'Video Enhance', description: 'Queue processing, stabilization, enhancement.', href: '/tools/video-enhance', icon: Video },
  { name: 'GitHub Explorer', description: 'Search public repos, README, file tree, stats.', href: '/tools/github-explorer', icon: Github },
  { name: 'Sticker Maker', description: 'Custom stickers, presets, PNG export.', href: '/tools/sticker-maker', icon: Palette },
  { name: 'Logo Maker', description: 'Branding, gaming, cyber, tech templates.', href: '/tools/logo-maker', icon: Code2 },
  { name: 'Global Search', description: 'Search tools, files, projects, docs, history.', href: '/tools', icon: FileSearch },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Tools</p>
            <h1 className="mt-3 text-4xl font-bold text-white">Drakiller Workspace</h1>
          </div>
          <Link href="/dashboard" className="btn-primary">
            Ke Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tools.map(({ name, description, href, icon: Icon }) => (
            <Link href={href} key={name} className="glass-panel group p-6 transition hover:border-blue-500/60">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">{name}</h2>
              <p className="mt-3 text-slate-400">{description}</p>
              <div className="mt-5 inline-flex items-center text-blue-400 group-hover:text-blue-300">
                Buka tool <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
