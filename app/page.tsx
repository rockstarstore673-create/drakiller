'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Image as ImageIcon, Video, Sparkles, Github, Code2, Palette } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8 pt-32 pb-32">
        <div className="mx-auto max-w-6xl">
          {/* Background glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 -z-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              Buat. Tingkatkan. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Bangun.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Platform AI terpadu untuk enhancement foto/video, AI Studio, GitHub Explorer, dan creator tools profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
                Mulai Membuat <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/tools" className="btn-secondary text-lg px-8 py-4">
                Jelajahi Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-16 text-center">Fitur Utama</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ImageIcon, title: 'Photo Enhance', desc: 'Tingkatkan foto dengan AI upscaling 2x-4x, denoise, dan enhancement warna' },
              { icon: Video, title: 'Video Enhance', desc: 'Proses video dengan stabilisasi, sharpen, dan quality improvement' },
              { icon: Sparkles, title: 'AI Studio', desc: 'Chat dengan AI Groq untuk writing, coding, ideation, dan analysis' },
              { icon: Github, title: 'GitHub Explorer', desc: 'Cari repository, explore code, dan download public repos' },
              { icon: Palette, title: 'Creator Studio', desc: 'Buat sticker, logo, thumbnail, dan graphic profesional' },
              { icon: Code2, title: 'Developer Tools', desc: 'JSON formatter, JWT decoder, regex tester, dan utilities' }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="glass-panel p-6 hover:border-blue-500/50 transition space-y-4">
                  <Icon className="w-10 h-10 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Enhancement */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-slate-900/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="section-title">Photo Enhance</h2>
              <p className="text-slate-300 text-lg">Tingkatkan kualitas foto Anda dengan teknologi AI terkini. Upscaling hingga 4x resolusi, denoise otomatis, dan enhancement warna profesional.</p>
              <ul className="space-y-3 text-slate-300">
                {['Upscale 2x - 4x tanpa blur', 'Denoise dan sharpening otomatis', 'Face enhancement', 'Color & contrast adjustment'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/tools/photo-enhance" className="btn-primary inline-flex">
                Coba Sekarang <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="glass-panel p-8 aspect-square flex items-center justify-center">
              <div className="text-center space-y-4">
                <ImageIcon className="w-16 h-16 text-blue-400 mx-auto" />
                <p className="text-slate-400">Drag foto di sini atau klik untuk upload</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Enhancement */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="glass-panel p-8 aspect-square flex items-center justify-center order-2 md:order-1">
              <div className="text-center space-y-4">
                <Video className="w-16 h-16 text-cyan-400 mx-auto" />
                <p className="text-slate-400">Upload video untuk processing</p>
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="section-title">Video Enhance</h2>
              <p className="text-slate-300 text-lg">Proses video dengan queue system yang reliable. Stabilisasi, sharpen, dan quality improvement untuk hasil professional.</p>
              <ul className="space-y-3 text-slate-300">
                {['Stabilisasi video otomatis', 'Sharpening dan clarity', 'Resolution upscaling', 'Background processing'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/tools/video-enhance" className="btn-primary inline-flex">
                Coba Sekarang <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Explorer */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-slate-900/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="section-title">GitHub Explorer</h2>
              <p className="text-slate-300 text-lg">Cari dan explore public repositories GitHub. Lihat code, dokumentasi, dan download repository dalam format ZIP.</p>
              <ul className="space-y-3 text-slate-300">
                {['Search repo dengan filter advanced', 'View README dan file tree', 'Clone atau download ZIP', 'Rate limit handling'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/tools/github-explorer" className="btn-primary inline-flex">
                Jelajahi GitHub <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="glass-panel p-8 aspect-square flex items-center justify-center">
              <div className="text-center space-y-4">
                <Github className="w-16 h-16 text-slate-300 mx-auto" />
                <p className="text-slate-400">Explore jutaan repository</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Studio */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-12 text-center">Creator Studio</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Sticker Maker', desc: 'Buat sticker pack profesional dengan background removal' },
              { title: 'Logo Maker', desc: 'Design logo untuk gaming, esports, brand, dan developer' },
              { title: 'Thumbnail Maker', desc: 'Template thumbnail YouTube, TikTok, dan gaming' }
            ].map((tool, i) => (
              <div key={i} className="glass-panel p-6 text-center space-y-4 hover:border-blue-500/50 transition">
                <Palette className="w-12 h-12 text-blue-400 mx-auto" />
                <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
                <p className="text-slate-400 text-sm">{tool.desc}</p>
                <Link href={`/tools/${tool.title.toLowerCase().replace(' ', '-')}`} className="btn-secondary inline-flex w-full justify-center mt-4">
                  Buka
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="glass-panel p-12 text-center space-y-8">
            <h2 className="section-title">Siap Memulai?</h2>
            <p className="text-xl text-slate-300">Bergabunglah dengan ribuan creator dan developer yang menggunakan Drakiller untuk workflow mereka.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
                Buat Akun Gratis
              </Link>
              <Link href="/docs" className="btn-secondary text-lg px-8 py-4">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
