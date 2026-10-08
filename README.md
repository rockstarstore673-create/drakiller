# DRAKILLER

Drakiller adalah platform AI Creative & Developer Workspace yang menggabungkan AI Studio, photo/video enhancement, creator tools, GitHub explorer, project manager, dan sistem kerja modern berbasis Supabase dan Vercel.

## Quick start

```bash
npm install
npm run dev
```

## Environment

Salin `.env.example` ke `.env.local` dan isi variabel yang diperlukan.

## Struktur utama

- app/
- components/
- lib/
- services/
- supabase/
- public/

## Catatan keamanan

- Jangan pernah mengekspos API key di frontend.
- Gunakan Supabase Auth + RLS untuk data user.
- Semua provider AI harus diakses dari server.
